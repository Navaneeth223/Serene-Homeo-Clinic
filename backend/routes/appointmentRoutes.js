import express from 'express';
import { createAppointment, getAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

router.route('/')
    .post(createAppointment)
    .get(getAppointments);

export default router;
