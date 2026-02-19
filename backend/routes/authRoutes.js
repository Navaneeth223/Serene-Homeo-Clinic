import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
    const { password } = req.body;

    // Add logging for debugging on Render
    console.log(`Login attempt at ${new Date().toISOString()}`);
    if (!process.env.ADMIN_PASSWORD) {
        console.error('CRITICAL: ADMIN_PASSWORD environment variable is NOT SET!');
    }

    if (password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true, token: 'dummy-admin-token' });
    } else {
        console.warn(`Login failed: Invalid password attempt.`);
        res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

export default router;
