import n8nService from '../services/n8nService.js';

/**
 * Webhook Controller
 * Handles incoming data from external services (n8n, WAHA, etc.)
 */

// Handle incoming WhatsApp message (Universal Mapping Logic)
export const handleWhatsAppWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log('📨 Incoming Webhook Payload:', JSON.stringify(payload, null, 2));

    // Universal mapping for Identity (supports multiple common field names)
    const wa_identity = payload.wa_identity ||
      payload.phone ||
      payload.from ||
      payload.sender ||
      payload.remoteJid ||
      payload.chatId;

    // Universal mapping for Message Content
    const message = payload.message ||
      payload.text ||
      payload.chatInput ||
      payload.body ||
      payload.content ||
      (payload.data && (payload.data.body || payload.data.text));

    // Universal mapping for PushName
    const pushName = payload.pushName ||
      payload.senderName ||
      payload.name ||
      payload.fromName ||
      (payload.data && payload.data.pushName);

    if (!wa_identity || !message) {
      console.warn('⚠️ Webhook missing required fields (identity/message). Received:', Object.keys(payload));
      return res.status(200).json({
        success: false,
        message: 'Missing identity or message content'
      });
    }

    // Adapt payload for the service
    const adaptedPayload = {
      wa_identity,
      message,
      pushName: pushName || 'User WhatsApp'
    };

    const result = await n8nService.handleIncomingWhatsAppMessage(adaptedPayload);

    return res.status(200).json({
      success: true,
      message: 'Processing completed',
      synced: result.success
    });
  } catch (error) {
    console.error('❌ Webhook Controller Error:', error);
    return res.status(200).json({
      success: false,
      message: 'Error processing webhook'
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
