# 🍽️ Food RAG Web Application

A modern, AI-powered food knowledge assistant built with Next.js 15, featuring Retrieval-Augmented Generation (RAG) capabilities for intelligent food-related queries.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jiangye-songs-projects/v0-no-content)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/YMceEHoIuIZ)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 📖 Overview

Food RAG Web is an intelligent assistant that provides detailed answers about food, ingredients, cuisines, and culinary traditions. It combines the power of vector databases, AI models, and semantic search to deliver accurate and contextually relevant responses to food-related queries.

### ✨ Key Features

- **🤖 AI-Powered Chat Interface**: Interactive chat with multiple AI model options (Llama 3.1, Mixtral)
- **🔍 Retrieval-Augmented Generation**: Semantic search through curated food knowledge base
- **📊 Admin Dashboard**: Comprehensive analytics and database management
- **🗃️ Vector Database Integration**: Upstash Vector for efficient similarity search
- **📈 Analytics & Monitoring**: Query analytics, response times, and system health metrics
- **🌙 Dark/Light Theme**: Built-in theme switching with next-themes
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS + Radix UI components
- **Database**: Neon PostgreSQL (for analytics and management)
- **Vector Database**: Upstash Vector (for semantic search)
- **AI Models**: Groq API (Llama 3.1, Mixtral)
- **Deployment**: Vercel
- **Package Manager**: pnpm

### Project Structure

```
food-rag-web/
├── app/                     # Next.js 15 app directory
│   ├── page.tsx            # Main chat interface
│   ├── layout.tsx          # Root layout
│   └── admin/              # Admin dashboard
│       ├── analytics/      # Analytics pages
│       ├── food-items/     # Food item management
│       └── vectors/        # Vector database management
├── components/
│   ├── chat-interface.tsx  # Main chat component
│   ├── admin/             # Admin-specific components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── rag-actions.ts     # RAG functionality
│   ├── admin-actions.ts   # Admin operations
│   └── utils.ts           # Utility functions
├── data/
│   └── foods.json         # Food knowledge base
└── scripts/               # Database setup scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Upstash Vector database account
- Neon PostgreSQL database
- Groq API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-rag-web.git
   cd food-rag-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # Upstash Vector Database
   UPSTASH_VECTOR_REST_URL=your_upstash_vector_url
   UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_token
   
   # Neon PostgreSQL
   DATABASE_URL=your_neon_database_url
   
   # Groq AI API
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Set up the database**
   ```bash
   # Create admin tables
   pnpm run db:setup
   
   # Seed initial food items (optional)
   pnpm run db:seed
   ```

5. **Initialize vector database**
   ```bash
   pnpm run vector:migrate
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:setup` - Set up database tables
- `pnpm db:seed` - Seed initial data
- `pnpm vector:migrate` - Migrate data to vector database

## 🎯 Usage

### Chat Interface

1. **Ask Questions**: Type food-related questions in natural language
2. **Model Selection**: Choose between different AI models for responses
3. **Source Citations**: View the knowledge base sources used for each answer
4. **Suggested Prompts**: Use pre-built prompts to get started

### Admin Dashboard

Access the admin panel at `/admin` to:

- **View Analytics**: Monitor query patterns, response times, and popular food types
- **Manage Food Items**: Add, edit, or delete items in the knowledge base
- **Vector Operations**: Manage vector database operations and view statistics
- **System Health**: Monitor application performance and database status

## 🔧 Configuration

### AI Models

The application supports multiple AI models through the Groq API:

- **Llama 3.1 8B Instant**: Fast responses, good for general queries
- **Mixtral 8x7B**: Balanced performance for complex queries

### Vector Database

Food knowledge is stored in Upstash Vector for efficient semantic search:

- **Embedding Model**: Text embeddings for similarity search
- **Metadata**: Region, type, and additional food properties
- **Real-time Updates**: Dynamic addition and removal of food items

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app) for rapid prototyping
- Powered by [Groq](https://groq.com/) for fast AI inference
- Vector search by [Upstash](https://upstash.com/)
- Database hosting by [Neon](https://neon.tech/)
- UI components by [Radix UI](https://www.radix-ui.com/)

## 📞 Support

For support, email [your-email@example.com](mailto:your-email@example.com) or open an issue on GitHub.
