import express from 'express';
import {
  submitDemoRequest,
  healthCheck
} from './controllers/demoController.js';

const router = express.Router();

// Demo request route
router.post('/request', submitDemoRequest);

// Health check
router.get('/health', healthCheck);

export default router; 