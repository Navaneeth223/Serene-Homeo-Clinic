import Appointment from '../models/Appointment.js';

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

        res.status(201).json({
            success: true,
            data: appointment,
            message: 'Appointment booked successfully!'
        });
    } catch (error) {
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
