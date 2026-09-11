# 🌿 Verdant Market

A full-featured online supermarket built with React, TypeScript, and Vite — covering everything from browsing and checkout to a complete admin dashboard.

**Live demo:** [verdant-supermarket.netlify.app](https://verdant-supermarket.netlify.app/)

## Features

**Storefront**
- Home, Shop, Deals, Fresh, and New Arrivals pages
- Product details, search, and filtering
- Cart, wishlist, and multi-step checkout
- Order confirmation and order tracking
- Account area (overview, orders, addresses, payment, profile, preferences)
- Login / signup
- Informational pages: About, Contact, FAQ, Delivery, Careers, Stores, Privacy, Terms

**Admin dashboard**
- Overview, products, inventory, orders, and customers
- Promotions and coupons management
- Analytics
- Store settings

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev/build tooling
- [React Router](https://reactrouter.com/) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for analytics charts
- [Lucide React](https://lucide.dev/) for icons
- [Oxlint](https://oxc.rs/) for linting

State is managed with React Context, with dedicated providers for auth, products, cart, wishlist, orders, and promotions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone git@github.com:kasuni17/Verdant-Market.git
cd Verdant-Market
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server with hot module replacement. By default it's available at `http://localhost:5173`.

### Build

```bash
npm run build
```

Type-checks the project and builds a production-ready bundle.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/   # Reusable UI components
├── context/      # React Context providers (auth, cart, products, orders, etc.)
├── data/         # Static/mock data
├── lib/          # Utilities and helpers
├── pages/        # Route-level pages
│   ├── account/  # Customer account pages
│   └── admin/    # Admin dashboard pages
├── types/        # Shared TypeScript types
├── App.tsx       # Route definitions and provider setup
└── main.tsx      # App entry point
```

## Deployment

The project is deployed on [Netlify](https://www.netlify.com/) and is configured to build with `npm run build`, serving the `dist` output.

## License

This project currently has no license specified.
