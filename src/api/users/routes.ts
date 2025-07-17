import express from 'express';
import { registerUser, loginUser, updateWebhook } from './controller';
import { authenticate } from '../../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/webhook', authenticate, updateWebhook);

export default router;
