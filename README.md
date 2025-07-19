# 🛍️ Venom Luxury Store

A sophisticated luxury fashion e-commerce platform built with Next.js, PostgreSQL, and Stripe.

## ✨ Features

- **🎨 Ultra-minimalist design** with luxury aesthetics
- **🛒 Complete e-commerce functionality** with cart and checkout
- **👑 Admin dashboard** for product and order management
- **🔐 Secure authentication** with NextAuth.js
- **💳 Stripe payment integration** for seamless transactions
- **📱 Fully responsive** mobile-first design
- **⚡ Optimized performance** with Next.js 14
- **🗄️ PostgreSQL database** with Prisma ORM

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **React Hook Form** for form handling

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma ORM** for database management
- **NextAuth.js** for authentication
- **Stripe** for payment processing
- **bcryptjs** for password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd venom
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your actual values:
# - DATABASE_URL (PostgreSQL connection string)
# - NEXTAUTH_SECRET (random string)
# - STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your luxury store!

## 🗄️ Database Schema

The database includes comprehensive models for:

- **Users & Authentication** (NextAuth.js compatible)
- **Products & Variants** (with inventory management)
- **Categories & Tags** (hierarchical organization)
- **Shopping Cart & Wishlist** (persistent user data)
- **Orders & Payments** (complete order lifecycle)
- **Reviews & Ratings** (customer feedback)
- **Addresses** (shipping and billing)

## 👤 Default Accounts

After seeding, you can login with:

**Admin Account:**
- Email: `admin@venom.com`
- Password: `admin123`
- Access: Full admin dashboard

**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`
- Access: Customer features

## 🎨 Design System

The app uses a luxury design system with:

- **Typography:** Inter font family
- **Colors:** Black, white, charcoal, with luxury gold accents
- **Spacing:** Generous whitespace for premium feel
- **Animations:** Subtle Framer Motion effects

## 📁 Project Structure

```
venom/
├── app/                  # Next.js App Router pages
├── components/           # Reusable UI components
├── lib/                  # Utility functions and configs
├── prisma/              # Database schema and migrations
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── server/              # Express.js backend (optional)
```

## 🚢 Deployment

### Frontend (Vercel - Recommended)
```bash
# Deploy to Vercel
npm i -g vercel
vercel

# Or connect your GitHub repo to Vercel dashboard
```

### Database (Railway - Recommended)
1. Create Railway account
2. Create new PostgreSQL service
3. Copy DATABASE_URL to your environment
4. Run `npx prisma db push` and `npm run db:seed`

### Alternative Hosting Options
- **Railway:** Full-stack deployment with database
- **Render:** Free tier with PostgreSQL
- **DigitalOcean App Platform:** Simple deployment
- **AWS/Google Cloud:** Enterprise-grade scaling

## 🔧 Development

### Database Commands
```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed sample data
```

### Development Commands
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

## 🛒 Sample Products

The seed data includes luxury items:
- Silk Evening Dress ($2,499)
- Cashmere Overcoat ($3,999) 
- Diamond Tennis Bracelet ($8,999)
- Italian Leather Handbag ($1,899)
- Designer Sunglasses ($799)

## 🔐 Security Features

- Secure password hashing with bcryptjs
- JWT-based authentication
- Input validation and sanitization
- Rate limiting (when Express backend is used)
- CORS configuration
- Environment variable protection

## 📈 Admin Features

- Product management (CRUD operations)
- Order management and tracking
- Customer management
- Sales analytics and reporting
- Inventory tracking

## 🎯 Customer Features

- Product browsing with advanced filters
- Shopping cart and wishlist
- Secure checkout with Stripe
- Order history and tracking
- User account management
- Product reviews and ratings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is private and proprietary.

---

**Built with ❤️ for luxury fashion** # luxury-store
