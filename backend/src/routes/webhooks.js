import express from 'express';
import { receiveFromN8n, sendToN8n, webhookHealth } from '../controllers/webhookController.js';

const router = express.Router();

// Webhook endpoint for n8n to send data to ePanen
import { handleWhatsAppWebhook } from '../controllers/webhookController.js';
router.post('/n8n/incoming', handleWhatsAppWebhook);

// Endpoint for ePanen to send data to n8n
router.post('/n8n/send', sendToN8n);

// Health check
router.get('/health', webhookHealth);

export default router;
