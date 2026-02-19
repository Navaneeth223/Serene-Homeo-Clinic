import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true, token: 'dummy-admin-token' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

export default router;
