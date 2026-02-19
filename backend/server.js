import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import webpush from 'web-push';
import authRoutes from './routes/authRoutes.js';
import pushRoutes from './routes/pushRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Configure Web Push
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
        'mailto:admin@serenehomeo.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
}

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5000',
    'https://serene-homeo-clinic.vercel.app', // Explicitly add the user's Vercel URL
    process.env.FRONTEND_URL,
].filter(Boolean).map(origin => origin.trim().replace(/\/$/, ''));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.trim().replace(/\/$/, '');
        if (allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            console.error(`CORS Blocked: ${origin} (Allowed: ${allowedOrigins.join(', ')})`);
            // Instead of throwing an error which might break the response headers, 
            // we'll just not return the origin, which will cause a standard CORS failure in the browser.
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/push', pushRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health Check
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Sanjeevani Homeo Clinic API is running...',
        config: {
            node_env: process.env.NODE_ENV,
            allowedOrigins: allowedOrigins
        }
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('--- SERVER CONFIGURATION ---');
    console.log(`Port: ${PORT}`);
    console.log(`Node Env: ${process.env.NODE_ENV}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`Allowed Origins: ${allowedOrigins.join(', ')}`);
    console.log('---------------------------');
    console.log(`Server running on port ${PORT}`);
});
