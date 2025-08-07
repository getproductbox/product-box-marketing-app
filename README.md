# Product Box Marketing Site

A modern, high-performance marketing site for Product Box, featuring sophisticated animations and a clean design inspired by leading design agencies.

## 🚀 Features

- **Animated Hero Section**: Split-layout with interactive elements
- **Service Cards**: Three productized services (Vision, Scale, Thrive)
- **Case Studies**: Filterable portfolio with metrics and outcomes
- **Contact Form**: Floating contact button with slide-out form
- **Email Integration**: Resend API for contact form submissions
- **CMS Ready**: Sanity CMS schemas configured for dynamic content

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion
- **Email**: Resend API
- **CMS**: Sanity (optional)
- **Deployment**: Vercel-ready

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/getproductbox/product-box-marketing-app.git
cd product-box-marketing-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables:
```env
# Resend API (required for contact form)
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
VITE_CONTACT_EMAIL=hello@getproductbox.com

# Sanity CMS (optional)
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# For Vercel deployment
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=hello@getproductbox.com
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📧 Email Configuration

The contact form uses Resend for email delivery. To set up:

1. Sign up for a [Resend account](https://resend.com)
2. Create an API key
3. Add the API key to your environment variables
4. Update the `VITE_CONTACT_EMAIL` to your desired recipient

## 🎨 Design System

The site uses a custom design system with:

- **Colors**: Custom palette with `pb-` prefix
- **Typography**: Inter font with scale from hero (72px) to body-sm (16px)
- **Animations**: Scroll-triggered animations with Framer Motion
- **Components**: Reusable, animated components

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The `api/send-email.ts` serverless function will automatically be deployed.

### Other Platforms

For non-Vercel deployments, you'll need to:
1. Set up your own email API endpoint
2. Update the contact form to use your endpoint

## 📂 Project Structure

```
src/
├── components/       # React components
│   ├── HeroSection.tsx
│   ├── ServiceCards.tsx
│   ├── CaseStudies.tsx
│   ├── ContactFloat.tsx
│   └── Footer.tsx
├── lib/             # Utility functions
│   ├── utils.ts
│   ├── resend.ts
│   └── sanity.ts
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles

api/
└── send-email.ts    # Vercel serverless function

sanity/
└── schemas/         # Sanity CMS schemas
    └── index.ts
```

## 🔧 Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

## 📝 License

© 2025 Product Box. All rights reserved.