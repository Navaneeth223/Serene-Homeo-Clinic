import express from 'express';
import { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.route('/')
    .post(createAppointment)
    .get(getAppointments);

router.put('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;
