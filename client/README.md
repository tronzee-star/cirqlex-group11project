# Sustainability Dashboard

A responsive sustainability dashboard built with React, Vite, and Chart.js.

## Features

- **Dark Green Navbar** (#004d40) with EcoTrack logo, navigation links, search bar, and user avatar
- **Hero Section** with personalized greeting and sustainability impact report
- **KPI Cards** showing:
  - Carbon Footprint (15% reduction)
  - Reduction Progress (20% of target)
  - Sustainability Score (78/100)
- **Interactive Chart** displaying carbon footprint reduction over 6 months
- **Impact Statistics** showing trees planted, water saved, and waste recycled
- **Corporate Gifts Section** featuring eco-friendly products
- **Articles Section** with sustainability tips and trends

## Tech Stack

- React 19.1.1
- Vite 7.1.7
- Chart.js for data visualization
- Custom CSS with Poppins font
- Responsive design for mobile and desktop

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser to http://localhost:5173 (or 5174 if 5173 is in use)

## Project Structure

```
src/
├── components/
│   ├── SustainabilityDashboard.jsx  # Main dashboard component
│   └── SustainabilityDashboard.css  # Dashboard styles
├── App.jsx                          # Root app component
├── main.jsx                         # React entry point
└── index.css                        # Global styles
```

## Design Specifications

- Colors: Dark green (#004d40), light green (#e8f5e9), white backgrounds
- Typography: Poppins font family
- Layout: Responsive grid system
- Animations: Hover effects and smooth transitions
- Chart: Green line chart with 6-month data visualization

## Browser Support

Supports all modern browsers with ES6+ support.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
