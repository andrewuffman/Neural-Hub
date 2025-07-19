# Neural Hub

A modern web application for organizing, discovering, and collaborating on AI-generated content. Connect all your AI tools in one beautiful workspace.

**🚀 Live at: https://neural-hub-theta.vercel.app/**

## 🚀 Features

- **Smart Content Organization**: Automatically categorize and tag AI-generated content
- **Powerful Search**: Find any content instantly across all your AI tools
- **Team Collaboration**: Share collections and collaborate with your team
- **AI Integrations**: Connect ChatGPT, Midjourney, Claude, and more
- **Secure & Private**: Your content is encrypted and you control access
- **Monetization Ready**: Built-in subscription system with Stripe integration

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: Prisma ORM, SQLite (easily switchable to PostgreSQL)
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd neural-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration values.

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
neural-hub/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
└── package.json
```

## 💰 Monetization Strategy

The app is designed with multiple revenue streams:

1. **Freemium Model**: Free tier with 100 content items, paid tiers for unlimited
2. **Subscription Plans**:
   - Free: $0/month (100 items, basic features)
   - Pro: $9/month (unlimited, advanced features)
   - Enterprise: $29/month (unlimited, analytics, custom integrations)
3. **Future Revenue Streams**:
   - API access for developers
   - Custom integrations for enterprise
   - Marketplace for AI prompts and templates

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

### Database Management

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio for database management
npx prisma studio
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@neuralhub.com
- 💬 Discord: [Join our community](https://discord.gg/neuralhub)
- 📖 Documentation: [docs.neuralhub.com](https://docs.neuralhub.com)

## 🎯 Roadmap

- [ ] AI-powered content suggestions
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Advanced team collaboration features
- [ ] AI prompt marketplace
- [ ] Content templates library 