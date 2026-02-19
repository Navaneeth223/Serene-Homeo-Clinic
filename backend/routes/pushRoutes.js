import express from 'express';
import PushSubscription from '../models/PushSubscription.js';

const router = express.Router();

// Get VAPID Public Key
router.get('/key', (req, res) => {
    res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

// Subscribe a new device
router.post('/subscribe', async (req, res) => {
    try {
        const subscription = req.body;
        // Check if already exists
        const existing = await PushSubscription.findOne({ endpoint: subscription.endpoint });
        if (existing) {
            return res.status(200).json({ success: true, message: 'Already subscribed' });
        }
        
        await PushSubscription.create(subscription);
        res.status(201).json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ success: false, error: 'Failed to subscribe' });
    }
});

export default router;
