# Slovak Grocery Price Comparison App

A modern web application for comparing grocery prices across Slovak stores (Tesco, Lidl, Kaufland, Billa) with social recipe sharing and meal planning features.

## Features

- 🛒 **Price Comparison**: Compare prices across multiple grocery stores
- 📱 **Recipe Social Platform**: Share and discover recipes from the community  
- 📅 **Weekly Meal Planning**: Plan your meals and find the cheapest ingredients
- 💰 **Budget Tracking**: Monitor your grocery spending with visual charts
- 🥬 **Smart Shopping Lists**: Automatically generated from meal plans
- 🇸🇰 **Slovak Language**: Fully localized for Slovak users

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/grocery-comparison-app.git
cd grocery-comparison-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Deployment

This app is configured for easy deployment to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   └── ...             # Custom components
├── styles/
│   └── globals.css     # Global CSS with Tailwind
├── package.json
├── vite.config.ts
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details