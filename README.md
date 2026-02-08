# Healthcare Support Platform

A modern healthcare support web application with an AI-powered chatbot using RAG (Retrieval-Augmented Generation) architecture.

## 🌟 Features

- **AI Chatbot**: Intelligent healthcare assistant powered by Google Gemini 2.5 Flash
- **RAG Implementation**: Retrieves relevant FAQs for accurate, context-aware responses
- **Patient Registration**: Easy form for patients to register and book appointments
- **Volunteer Registration**: System for volunteers to sign up
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Chat**: Streaming responses with conversation history

## 🛠️ Tech Stack

### Frontend
- Next.js 16.1.6
- React 19.2.3
- Tailwind CSS 4.0
- Radix UI
- Lucide React

### AI & RAG
- Google Gemini 2.5 Flash
- @google/generative-ai
- Custom RAG implementation
- FAQ search algorithm

### Backend
- Next.js API Routes
- Node.js runtime

### Forms & Validation
- React Hook Form
- Zod
- React Hot Toast

### Deployment
- Netlify

## 🤖 RAG Implementation

The chatbot uses **Retrieval-Augmented Generation** for accurate healthcare information:

1. User asks a question
2. System searches healthcare FAQs database
3. Top 3 relevant FAQs retrieved
4. FAQs + user question sent to Google Gemini
5. Gemini generates context-aware response
6. Response streamed back to user

**Why RAG?**
- ✅ Prevents AI hallucinations
- ✅ Provides accurate healthcare information
- ✅ Grounded in real FAQ data
- ✅ Context-aware responses

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Google Gemini API key ([Get it here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ronin-yashu/intern-asset.git
cd intern-asset/assignment
```
2. **Install dependencies**
```bash
npm install
```
3. **Setup environment variables**
Create a .env.local file in the assignment folder:
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```
4. **Run development server**
```bash
npm run dev
```
5. **Open in browser**
```bash
http://localhost:3000
```

