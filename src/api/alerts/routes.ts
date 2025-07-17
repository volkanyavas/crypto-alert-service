import express from 'express';
import { createAlert, getAlerts } from './controller';
import { authenticate } from '../../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createAlert);
router.get('/', authenticate, getAlerts);

export default router;
