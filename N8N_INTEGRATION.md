# n8n + WhatsApp Integration Guide

This guide shows how to connect ePanen Web Platform with your existing n8n WhatsApp workflow.

## Architecture

```
┌─────────────────┐
│  WhatsApp User  │
└────────┬────────┘
         │ (message)
         ▼
┌─────────────────┐
│      n8n        │ ← Your existing WhatsApp workflow
└────────┬────────┘
         │ (webhook)
         ▼
┌─────────────────┐
│  ePanen Backend │ ← Saves to Supabase, calls AI
│  /api/webhook/  │
│   n8n/incoming  │
└────────┬────────┘
         │ (AI response)
         ▼
┌─────────────────┐
│      n8n        │ ← Sends back to WhatsApp
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  WhatsApp User  │
└─────────────────┘
```

## Setup

### 1. Configure Environment Variables

Add to `backend/.env`:

```env
# n8n Webhook Configuration
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/epanen
N8N_API_KEY=your-optional-api-key
```

### 2. n8n Workflow Setup

#### Option A: n8n Calls ePanen (WhatsApp → Web)

Create a workflow in n8n that:

1. **Receives WhatsApp message** (your existing setup)
2. **Calls ePanen webhook:**
   ```json
   {
     "method": "POST",
     "url": "http://your-backend-url:3001/api/webhook/n8n/incoming",
     "body": {
       "type": "whatsapp_message",
       "phone": "{{$json.phone}}",
       "message": "{{$json.message}}",
       "customer_data": {
         "name": "{{$json.customer_name}}"
       }
     }
   }
   ```
3. **Gets AI response** from ePanen
4. **Sends back to WhatsApp**

#### Option B: ePanen Calls n8n (Web → WhatsApp)

When users chat via web platform, forward to WhatsApp:

```javascript
// In your questionController.js
import n8nService from '../services/n8nService.js';

// After AI responds, also send to WhatsApp via n8n
await n8nService.sendToWhatsApp({
  type: 'ai_response',
  phone: user.phone,
  message: aiResponse,
  category: aiCategory
});
```

### 3. Webhook Endpoints

#### Receive from n8n:
```
POST /api/webhook/n8n/incoming
```

**Body:**
```json
{
  "type": "whatsapp_message",
  "phone": "62812345678",
  "message": "Bagaimana cara menanam padi?",
  "customer_data": {
    "name": "Budi Santoso"
  },
  "session_id": "optional-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message processed and AI response sent",
  "ai_response": "Untuk menanam padi yang baik..."
}
```

#### Send to n8n:
```
POST /api/webhook/n8n/send
```

**Body:**
```json
{
  "type": "broadcast",
  "data": {
    "message": "Harga cabai hari ini naik!",
    "recipients": ["62812345678", "62898765432"]
  }
}
```

## Complete Flow Examples

### Flow 1: WhatsApp User Asks Question

1. User sends WhatsApp: "Bagaimana cara menanam padi?"
2. n8n receives message
3. n8n calls: `POST /api/webhook/n8n/incoming`
4. ePanen backend:
   - Saves message to `epanen_chat_messages`
   - Calls AI service
   - Saves AI response to `epanen_chat_messages`
   - Returns AI response
5. n8n sends AI response back to WhatsApp

### Flow 2: Web User Chats (Optional Forward to WhatsApp)

1. User logs in to ePanen web
2. User sends message via web chat
3. ePanen backend:
   - Saves to `epanen_chat_messages`
   - Calls AI service
   - **Optional:** Forwards to n8n for WhatsApp backup
   - Returns AI response to web

### Flow 3: Price Alert Broadcast

1. Admin updates price in web dashboard
2. Backend calls n8n:
   ```
   POST /api/webhook/n8n/send
   {
     "type": "price_alert",
     "data": {
       "price_data": {
         "name": "Cabai Merah",
         "price": 45000,
         "unit": "kg",
         "trend": "up"
       }
     }
   }
   ```
3. n8n broadcasts to all WhatsApp users

## Linking Existing Customers

If you have existing customers from your database:

### Option 1: Link by Phone Number

Add `phone` column to ePanen users:

```sql
-- Update existing users with phone from your customer table
UPDATE epanen_users
SET phone = customer.no_whatsapp
FROM customer
WHERE epanen_users.email = customer.email;
```

### Option 2: Create New View

Create a view that combines both:

```sql
CREATE VIEW v_all_users AS
SELECT
  u.id,
  u.name,
  u.email,
  u.phone,
  u.role,
  'web' as source
FROM epanen_users u

UNION ALL

SELECT
  c.id,
  c.nama as name,
  c.email,
  c.no_whatsapp as phone,
  'farmer' as role,
  'whatsapp' as source
FROM customer c;
```

## n8n Workflow Example

Here's a complete n8n workflow JSON:

```json
{
  "nodes": [
    {
      "name": "WhatsApp Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "whatsapp",
        "responseMode": "responseNode"
      }
    },
    {
      "name": "Call ePanen AI",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "http://localhost:3001/api/webhook/n8n/incoming",
        "body": {
          "type": "whatsapp_message",
          "phone": "={{$json.phone}}",
          "message": "={{$json.message}}",
          "customer_data": {
            "name": "={{$json.customer_name}}"
          }
        }
      }
    },
    {
      "name": "Send WhatsApp Reply",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "your-whatsapp-gateway-api",
        "body": {
          "phone": "={{$json.phone}}",
          "message": "={{$json.ai_response}}"
        }
      }
    }
  ]
}
```

## Testing the Integration

### Test Webhook from n8n:

```bash
curl -X POST http://localhost:3001/api/webhook/n8n/incoming \
  -H "Content-Type: application/json" \
  -d '{
    "type": "whatsapp_message",
    "phone": "62812345678",
    "message": "Test message from n8n"
  }'
```

### Test Sending to n8n:

```bash
curl -X POST http://localhost:3001/api/webhook/n8n/send \
  -H "Content-Type: application/json" \
  -d '{
    "type": "custom",
    "data": {
      "message": "Broadcast test"
    }
  }'
```

## Troubleshooting

### Webhook not receiving from n8n
- Check firewall/port forwarding
- Verify N8N_WEBHOOK_URL is correct
- Check n8n logs for errors

### Messages not saving to database
- Check Supabase connection
- Verify table `epanen_chat_messages` exists
- Check user has valid phone number

### AI not responding
- Verify AI_API_KEY in .env
- Check AI service is accessible
- Check backend logs for errors

## Security

⚠️ **Important:**
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to n8n workflows
- Use API keys for n8n authentication
- Validate all incoming webhook data
- Rate limit webhook endpoints

---

**Need help?** Check backend logs or contact support.
