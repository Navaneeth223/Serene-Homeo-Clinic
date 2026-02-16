import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Patient name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    email: {
        type: String,
    },
    date: {
        type: Date,
        required: [true, 'Preferred date is required'],
    },
    time: {
        type: String,
        required: [true, 'Preferred time is required'],
    },
    message: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
