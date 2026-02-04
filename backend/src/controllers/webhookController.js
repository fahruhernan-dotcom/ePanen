import n8nService from '../services/n8nService.js';

/**
 * Webhook Controller
 * Handles incoming data from external services (n8n, WAHA, etc.)
 */

// Handle incoming WhatsApp message (The new mapping-based logic)
export const handleWhatsAppWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log('📨 WhatsApp Webhook Received:', JSON.stringify(payload, null, 2));

    if (!payload.wa_identity || !payload.message) {
      return res.status(400).json({
        success: false,
        message: 'Payload must include wa_identity (phone) and message'
      });
    }

    const result = await n8nService.handleIncomingWhatsAppMessage(payload);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Message processed and synced',
        data: result
      });
    } else {
      console.warn('⚠️ Webhook process result:', result.message);
      return res.status(200).json({
        success: false,
        message: result.message || 'Message received but not mapped to a user'
      });
    }
  } catch (error) {
    console.error('❌ Webhook Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing webhook'
    });
  }
};

// Original generic handler (restored)
export const receiveFromN8n = async (req, res) => {
  try {
    const payload = req.body;
    console.log('📥 Unified Webhook Received:', payload);

    // Most n8n payloads will be handled via the specific WhatsApp logic now,
    // but we'll retain this for other generic n8n integrations.
    return res.status(200).json({ success: true, message: 'Data received' });
  } catch (error) {
    console.error('Webhook receive error:', error);
    res.status(500).json({ success: false });
  }
};

// Original sender (restored)
export const sendToN8n = async (req, res) => {
  try {
    const data = req.body;
    const result = await n8nService.sendToWhatsApp(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Health check (restored)
export const webhookHealth = (req, res) => {
  res.json({ status: 'ok', service: 'webhook-bridge' });
};

export default {
  handleWhatsAppWebhook,
  receiveFromN8n,
  sendToN8n,
  webhookHealth
};
