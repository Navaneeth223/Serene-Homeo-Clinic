import Appointment from '../models/Appointment.js';
import webpush from 'web-push';
import PushSubscription from '../models/PushSubscription.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
    try {
        const { name, phone, email, date, time, message } = req.body;

        // Basic validation
        if (!name || !phone || !date || !time) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            });
        }

        const appointment = await Appointment.create({
            name,
            phone,
            email,
            date,
            time,
            message,
        });

        // Notify Admins via Push
        try {
            const subscriptions = await PushSubscription.find();
            const notificationPayload = JSON.stringify({
                title: 'New Appointment! 📅',
                body: `${appointment.name} booked for ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}.`,
                url: '/admin'
            });

            const pushPromises = subscriptions.map(sub =>
                webpush.sendNotification(sub, notificationPayload).catch(err => {
                    console.error('Error sending push notification:', err);
                    if (err.statusCode === 410 || err.statusCode === 404) {
                        return PushSubscription.deleteOne({ endpoint: sub.endpoint });
                    }
                })
            );
            Promise.all(pushPromises);
        } catch (pushErr) {
            console.error('Push notification background error:', pushErr);
        }

        res.status(201).json({
            success: true,
            data: appointment,
            message: 'Appointment booked successfully!'
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
};

// @desc    Get all appointments (For admin/verify purpose)
// @route   GET /api/appointments
// @access  Private (Simplified for this project)
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'completed', 'no-show', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }

        res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
