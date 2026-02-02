import axios from 'axios';
import { aiConfig, detectCategory } from '../config/ai.js';

class AIService {
  constructor() {
    this.client = axios.create({
      baseURL: aiConfig.apiUrl,
      headers: {
        'Authorization': `Bearer ${aiConfig.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': aiConfig.headers['HTTP-Referer'],
        'X-Title': aiConfig.headers['X-Title']
      }
    });
  }

  /**
   * Ask AI a question with chat history for context
   * @param {string} question - User's question
   * @param {Array} chatHistory - Previous messages in the conversation
   * @returns {Promise<object>} AI response
   */
  async askAI(question, chatHistory = []) {
    try {
      const category = detectCategory(question);

      // Build messages array with system prompt and chat history
      const messages = [
        {
          role: 'system',
          content: aiConfig.systemPrompt
        },
        ...chatHistory.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.message
        })),
        {
          role: 'user',
          content: question
        }
      ];

      // Call OpenRouter API (compatible with OpenAI format)
      const response = await this.client.post('/chat/completions', {
        model: aiConfig.model,
        messages: messages,
        max_tokens: aiConfig.maxTokens,
        temperature: aiConfig.temperature
      });

      const aiResponse = response.data.choices[0].message.content;

      return {
        response: aiResponse,
        category: category,
        model: aiConfig.model,
        tokensUsed: response.data.usage?.total_tokens || 0
      };

    } catch (error) {
      console.error('AI Service Error:', error.response?.data || error.message);

      // If it's an OpenRouter specific error
      if (error.response?.status === 401) {
        console.error('❌ OpenRouter API Key invalid. Check your AI_API_KEY in .env');
      } else if (error.response?.status === 429) {
        console.error('❌ OpenRouter rate limit exceeded. Consider upgrading your plan.');
      }

      // Fallback response if AI service fails
      return this.getFallbackResponse(question);
    }
  }

  /**
   * Fallback response when AI service is unavailable
   * @param {string} question - User's question
   * @returns {object} Fallback response
   */
  getFallbackResponse(question) {
    const category = detectCategory(question);

    const fallbackMessages = {
      budidaya: 'Maaf, layanan AI sedang tidak tersedia. Untuk informasi budidaya, silakan cek artikel di menu Pengetahuan atau tanyakan di forum komunitas.',
      hama: 'Maaf, layanan AI sedang tidak tersedia. Untuk masalah hama dan penyakit, silakan konsultasi dengan penyuluh pertanian atau tanyakan di forum komunitas.',
      cuaca: 'Maaf, layanan AI sedang tidak tersedia. Untuk informasi cuaca, silakan cek aplikasi cuaca atau BMKG.',
      teknologi: 'Maaf, layanan AI sedang tidak tersedia. Silakan cek artikel teknologi pertanian di menu Pengetahuan.',
      pasar: 'Maaf, layanan AI sedang tidak tersedia. Untuk informasi harga pasar, silakan cek menu Harga Pasar.',
      general: 'Maaf, layanan AI sedang tidak tersedia. Silakan coba lagi nanti atau gunakan fitur lain di ePanen.'
    };

    return {
      response: fallbackMessages[category] || fallbackMessages.general,
      category: category,
      fallback: true
    };
  }

  /**
   * Test AI connection
   * @returns {Promise<boolean>} Connection status
   */
  async testConnection() {
    try {
      const response = await this.client.post('/chat/completions', {
        model: aiConfig.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: 'Hello! Just testing connection.'
          }
        ],
        max_tokens: 10
      });

      console.log('✅ OpenRouter connection successful');
      console.log('Model:', aiConfig.model);
      console.log('Response:', response.data.choices[0].message.content);

      return true;
    } catch (error) {
      console.error('❌ OpenRouter connection failed:', error.message);

      if (error.response?.status === 401) {
        console.error('   → Check your AI_API_KEY in .env file');
      }

      return false;
    }
  }

  /**
   * Get AI usage information
   * @returns {object} Usage stats
   */
  getInfo() {
    return {
      provider: 'OpenRouter',
      apiUrl: aiConfig.apiUrl,
      model: aiConfig.model,
      maxTokens: aiConfig.maxTokens,
      temperature: aiConfig.temperature
    };
  }
}

export default new AIService();
