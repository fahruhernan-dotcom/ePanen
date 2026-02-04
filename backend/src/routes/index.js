import express from 'express';
import { authenticate, isAdmin, isFarmer, optionalAuth } from '../middleware/auth.js';
import { validate, validationRules } from '../middleware/validator.js';

import * as authController from '../controllers/authController.js';
import * as questionController from '../controllers/questionController.js';
import * as chatController from '../controllers/chatController.js';
import * as contentController from '../controllers/contentController.js';
import * as marketController from '../controllers/marketController.js';
import * as discussionController from '../controllers/discussionController.js';
import * as dashboardController from '../controllers/dashboardController.js';
import webhookRouter from './webhooks.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ePanen API is running' });
});

// Auth routes (public)
router.post('/auth/register', validate, validationRules.register, authController.register);
router.post('/auth/login', validate, validationRules.login, authController.login);
router.post('/auth/whatsapp-login', authController.loginViaWhatsApp);
router.post('/auth/whatsapp-complete', authController.completeWhatsAppProfile);

// Auth routes (protected)
router.get('/auth/me', authenticate, authController.getProfile);
router.put('/auth/profile', authenticate, authController.updateProfile);
router.put('/auth/change-password', authenticate, validate, validationRules.changePassword, authController.changePassword);
router.post('/auth/logout', authenticate, authController.logout);

// Chat/Q&A routes (user only)
router.post('/chat/message', authenticate, isFarmer, validate, validationRules.sendMessage, questionController.sendMessage);
router.get('/chat/history', authenticate, isFarmer, questionController.getChatHistory);
router.get('/chat/history/:id', authenticate, isFarmer, questionController.getChatSession);
router.delete('/chat/history', authenticate, isFarmer, questionController.clearChatHistory);

// Guest chat route (public - no auth required)
router.post('/chat/guest', validate, validationRules.sendMessage, questionController.sendMessageGuest);

// Content routes (public)
router.get('/articles', optionalAuth, contentController.getAllArticles);
router.get('/articles/:id', optionalAuth, contentController.getArticleById);
router.get('/categories', optionalAuth, contentController.getAllCategories);

// Content management (admin only)
router.get('/admin/articles', authenticate, isAdmin, contentController.getAllArticles);
router.post('/admin/articles', authenticate, isAdmin, validate, validationRules.createArticle, contentController.createArticle);
router.put('/admin/articles/:id', authenticate, isAdmin, contentController.updateArticle);
router.delete('/admin/articles/:id', authenticate, isAdmin, contentController.deleteArticle);

// Market/Price routes (public)
router.get('/market/prices', optionalAuth, marketController.getCommodityPrices);
router.get('/market/prices/:name/trends', optionalAuth, marketController.getPriceTrends);

// Market management (admin only)
router.get('/admin/market/prices', authenticate, isAdmin, marketController.getCommodityPrices);
router.post('/admin/market/prices', authenticate, isAdmin, validate, validationRules.updatePrice, marketController.updateCommodityPrice);
router.delete('/admin/market/prices/:id', authenticate, isAdmin, marketController.deleteCommodityPrice);

// Discussion routes (public)
router.get('/discussions', optionalAuth, discussionController.getAllDiscussions);
router.get('/discussions/:id', optionalAuth, discussionController.getDiscussionById);

// Discussion management (authenticated users)
router.get('/discussions/me/stats', authenticate, discussionController.getMyDiscussionStats);
router.post('/discussions', authenticate, isFarmer, validate, validationRules.createDiscussion, discussionController.createDiscussion);
router.put('/discussions/:id', authenticate, discussionController.updateDiscussion);
router.post('/discussions/:id/reply', authenticate, discussionController.addReply);

// Discussion moderation (admin only)
router.get('/admin/discussions', authenticate, isAdmin, discussionController.getAllDiscussions);
router.delete('/admin/discussions/:id', authenticate, isAdmin, discussionController.deleteDiscussion);
router.delete('/admin/replies/:id', authenticate, isAdmin, discussionController.deleteReply);

// Admin Dashboard routes
router.get('/admin/stats', authenticate, isAdmin, dashboardController.getDashboardStats);
router.get('/admin/users', authenticate, isAdmin, dashboardController.getAllUsers);
router.put('/admin/users/:id/status', authenticate, isAdmin, dashboardController.updateUserStatus);
router.delete('/admin/users/:id', authenticate, isAdmin, dashboardController.deleteUser);

// Chat Logs (admin only)
router.get('/admin/chatlogs', authenticate, isAdmin, chatController.getAllChatLogs);
router.get('/admin/chatlogs/user/:userId', authenticate, isAdmin, chatController.getUserChatHistory);
router.get('/admin/chatlogs/stats', authenticate, isAdmin, chatController.getChatStats);
router.get('/admin/chatlogs/whatsapp', authenticate, isAdmin, chatController.getWhatsAppSessions);
router.get('/admin/chatlogs/whatsapp/:sessionId', authenticate, isAdmin, chatController.getWhatsAppChatHistory);

// WhatsApp Management (admin only)
import * as adminWhatsAppController from '../controllers/admin/whatsappController.js';
router.get('/admin/whatsapp/links', authenticate, isAdmin, adminWhatsAppController.getAllLinks);
router.post('/admin/whatsapp/link', authenticate, isAdmin, adminWhatsAppController.linkAccount);
router.post('/admin/whatsapp/sync', authenticate, isAdmin, adminWhatsAppController.syncAutoLinks);
router.delete('/admin/whatsapp/links/:id', authenticate, isAdmin, adminWhatsAppController.unlinkAccount);

// Webhook routes (for n8n integration)
router.use('/webhook', webhookRouter);

export default router;
