import n8nService from '../services/n8nService.js';

/**
 * Webhook endpoint for n8n
 * n8n can send WhatsApp messages, events, etc. to ePanen
 */

/**
 * Receive incoming message from n8n (WhatsApp → ePanen Web)
 * POST /api/webhook/n8n/incoming
 */
export const receiveFromN8n = async (req, res) => {
  try {
    const { type, phone, message, session_id, customer_data } = req.body;

    console.log('Received from n8n:', { type, phone, message });

    // Handle different types of messages
    switch (type) {
      case 'chat_message':
      case 'whatsapp_message':
        // Find user by phone or create/link
        const result = await n8nService.handleIncomingWhatsAppMessage({
          phone,
          message,
          message_from: customer_data?.name,
          session_id
        });

        if (result.success) {
          // Process with AI and send response back via n8n
          const aiResult = await n8nService.processWhatsAppChat(
            result.user_id,
            message
          );

          return res.json({
            success: true,
            message: 'Message processed and AI response sent',
            ai_response: aiResult.ai_response
          });
        }
        break;

      case 'customer_created':
        // Sync customer from WhatsApp to ePanen
        // TODO: Create user in epanen_users or link to existing customer
        return res.json({
          success: true,
          message: 'Customer synced to ePanen'
        });

      default:
        return res.status(400).json({
          success: false,
          message: 'Unknown message type'
        });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook error',
      error: error.message
    });
  }
};

/**
 * Send message from ePanen to n8n (for WhatsApp delivery)
 * POST /api/webhook/n8n/send
 */
export const sendToN8n = async (req, res) => {
  try {
    const { type, data } = req.body;

    let result;

    switch (type) {
      case 'broadcast':
        result = await n8nService.broadcastToWhatsApp(
          data.message,
          data.recipients
        );
        break;

      case 'price_alert':
        result = await n8nService.sendPriceAlert(data.price_data);
        break;

      case 'custom':
        result = await n8nService.sendToWhatsApp(data);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Unknown type'
        });
    }

    res.json(result);
  } catch (error) {
    console.error('Send to n8n error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send to n8n',
      error: error.message
    });
  }
};

/**
 * Health check for webhook
 * GET /api/webhook/health
 */
export const webhookHealth = (req, res) => {
  res.json({
    status: 'ok',
    webhook: 'n8n integration',
    n8n_configured: !!process.env.N8N_WEBHOOK_URL
  });
};
