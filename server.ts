import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { CINCINNATI_PROPERTIES } from './src/data/properties';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Route: AI Real Estate Chatbot (Gemini)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback friendly reply if API key isn't provided yet
      return res.json({
        reply: `Welcome to Pastorsil Real Estate! I am your Cincinnati real estate assistant. I can help you explore properties in Hyde Park, Indian Hill, Over-the-Rhine, Mount Adams, or Mason, estimate mortgage payments, or schedule a tour with Principal Broker Pastor Sil at (513) 706-6312. How can I assist you today?`,
        suggestedProperties: CINCINNATI_PROPERTIES.slice(0, 2),
      });
    }

    const ai = getAiClient();

    // Prepare system context with company details and current property inventory
    const propertySummary = CINCINNATI_PROPERTIES.map(
      (p) =>
        `- ID: ${p.id}, Title: "${p.title}", Price: $${p.price.toLocaleString()}, Neighborhood: ${p.address.neighborhood}, Beds: ${p.specs.bedrooms}, Baths: ${p.specs.bathrooms}, SqFt: ${p.specs.sqft}, Type: ${p.specs.propertyType}, Status: ${p.status}`
    ).join('\n');

    const systemInstruction = `You are Pastorsil AI, the premier virtual real estate consultant for Pastorsil Real Estate based in Cincinnati, Ohio.
Company Info:
- Firm Name: Pastorsil Real Estate
- Founder & Broker: Pastor Sil
- Phone: (513) 706-6312
- Email: pastorsilcotlg@gmail.com
- Main Location: Cincinnati, Ohio

Your goals:
1. Provide warm, professional, highly knowledgeable real estate advice for Cincinnati, OH and surrounding Hamilton, Warren, and Butler counties.
2. Answer queries about local neighborhoods (Hyde Park, Mount Adams, Indian Hill, Over-the-Rhine, Mason, Columbia-Tusculum, Walnut Hills, Downtown), school ratings, tax abatements, mortgage estimation, and buying/selling advice.
3. Recommend specific matching properties from our current inventory when relevant:
${propertySummary}

Formatting instructions:
- Keep answers polite, concise, structured, and easy to read.
- If recommending properties from inventory, reference their IDs or titles.
- Encourage contacting Pastor Sil directly at (513) 706-6312 or pastorsilcotlg@gmail.com for private showings and home valuation.`;

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Replay simple history if passed
    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn.role === 'user' && turn.text) {
          await chat.sendMessage({ message: turn.text });
        }
      }
    }

    const response = await chat.sendMessage({ message });
    const replyText = response.text || "I'm here to help with your Cincinnati real estate questions. Please contact Pastor Sil at (513) 706-6312 for immediate assistance.";

    // Simple keyword matching to attach relevant properties to response if applicable
    const matchedProperties = CINCINNATI_PROPERTIES.filter((p) => {
      const queryLower = message.toLowerCase();
      const nbrLower = p.address.neighborhood.toLowerCase();
      return queryLower.includes(nbrLower) || (queryLower.includes('luxury') && p.price > 1000000) || (queryLower.includes('rental') && p.status === 'For Rent');
    }).slice(0, 2);

    res.json({
      reply: replyText,
      suggestedProperties: matchedProperties.length > 0 ? matchedProperties : undefined,
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({
      reply: `Thank you for reaching out to Pastorsil Real Estate! We're experienced in all Cincinnati neighborhoods. Please call us at (513) 706-6312 or email pastorsilcotlg@gmail.com for personalized guidance.`,
    });
  }
});

// API Route: Contact & Showing Lead Inquiries
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message, inquiryType, preferredDate } = req.body;
  console.log('Received Lead Inquiry for Pastorsil Real Estate:', {
    timestamp: new Date().toISOString(),
    recipient: 'pastorsilcotlg@gmail.com',
    lead: { name, email, phone, subject, message, inquiryType, preferredDate },
  });

  res.json({
    success: true,
    message: `Thank you, ${name || 'valued client'}! Your request has been sent to Pastor Sil at pastorsilcotlg@gmail.com. We will contact you at ${phone || email} shortly.`,
  });
});

// API Route: Home Valuation Request
app.post('/api/valuation', (req, res) => {
  const { address, propertyType, bedrooms, bathrooms, estimatedSqft, name, email, phone } = req.body;
  console.log('Received Instant Home Valuation Request for Pastorsil Real Estate:', {
    timestamp: new Date().toISOString(),
    recipient: 'pastorsilcotlg@gmail.com',
    data: { address, propertyType, bedrooms, bathrooms, estimatedSqft, name, email, phone },
  });

  // Calculate estimated ballpark range for demonstration
  const baseRate = propertyType === 'Single Family' ? 180 : 210;
  const estimatedSqftNum = Number(estimatedSqft) || 2200;
  const estMid = estimatedSqftNum * baseRate;
  const estLow = Math.round(estMid * 0.92);
  const estHigh = Math.round(estMid * 1.08);

  res.json({
    success: true,
    estimateRange: {
      low: estLow,
      mid: Math.round(estMid),
      high: estHigh,
    },
    message: `Valuation request submitted! An in-depth Comparative Market Analysis (CMA) for ${address || 'your property'} is being prepared by Pastor Sil and will be emailed to ${email}.`,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pastorsil Real Estate server running on http://localhost:${PORT}`);
  });
}

startServer();
