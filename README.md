# Cirqlex - Circular Economy Marketplace
 #Live link - https://cirqlex-group11project.vercel.app/

> **A sustainable e-commerce platform empowering circular economy through pre-loved goods trading**

Cirqlex connects conscious buyers with sellers of refurbished and second-hand products, reducing waste and promoting sustainable consumption patterns through technology.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)

## 🌟 Key Features

**Multi-Role Platform Architecture**
- **Buyers**: Browse sustainable products, AI-assisted shopping, impact tracking
- **Vendors**: Product listing management, sales analytics, revenue tracking  
- **Admins**: Platform oversight, user management, system-wide analytics

**Core Capabilities**
- JWT-based secure authentication and authorization
- Real-time AI chatbot for product recommendations
- Comprehensive sustainability impact metrics
- Advanced search and filtering system
- Responsive mobile-first design
- Interactive data visualizations with Chart.js

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Development](#development)

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI Framework |
| React Router | 7.9.4 | Client-side routing |
| Vite | 7.1.7 | Build tooling |
| TailwindCSS | 4.1.16 | Styling |
| Chart.js | 4.5.1 | Data visualization |
| shadcn/ui | Latest | Component library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Flask | 2.3.3 | Web framework |
| SQLAlchemy | 3.0.3 | ORM |
| JWT Extended | 4.6.0 | Authentication |
| Flask-CORS | 4.0.0 | Cross-origin support |
| OpenAI | 1.0.0 | AI integration |
| PostgreSQL | 3.2.12 | Production database |
| Gunicorn | 21.2.0 | WSGI server |

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  React SPA + TailwindCSS + React Router + Chart.js     │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTPS/REST API
┌──────────────────▼──────────────────────────────────────┐
│                 API Gateway (Flask)                     │
│            CORS + JWT Middleware                        │
└──────────────────┬──────────────────────────────────────┘
                   │
     ┌─────────────┼─────────────┐
     │             │             │
┌────▼────┐  ┌────▼────┐  ┌────▼────┐
│  Auth   │  │Products │  │Insights │
│ Routes  │  │ Routes  │  │ Routes  │
└────┬────┘  └────┬────┘  └────┬────┘
     │             │             │
     └─────────────┼─────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Business Logic Layer                       │
│     Services + Utilities + AI Integration              │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Data Access Layer                          │
│         SQLAlchemy ORM + Models                        │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Database Layer                             │
│    PostgreSQL (Prod) / SQLite (Dev)                    │
└─────────────────────────────────────────────────────────┘
```

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Quick Start

**1. Clone Repository**
```bash
git clone https://github.com/tronzee-star/cirqlex-group11project.git
cd cirqlex-group11project
```

**2. Backend Setup**
```bash
cd server

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
flask db upgrade

# Run development server
python app.py
```
Server runs at `http://localhost:5000`

**3. Frontend Setup**
```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```
Client runs at `http://localhost:5173`

## ⚙️ Configuration

### Backend Environment Variables

Create `server/.env`:

```bash
# Application
SECRET_KEY=your-secret-key-change-in-production
JWT_SECRET_KEY=your-jwt-secret-change-in-production
FLASK_ENV=development

# Database
DATABASE_URL=sqlite:///instance/app.db  # Development
# DATABASE_URL=postgresql://user:password@host:5432/dbname  # Production

# CORS (comma-separated origins)
CORS_ORIGINS=http://localhost:5173,https://your-frontend.vercel.app

# AI Services
OPENAI_API_KEY=sk-your-openai-api-key
```

### Frontend Environment Variables

Create `client/.env`:

```bash
# API Configuration
VITE_API_BASE=http://localhost:5000/api  # Development
# VITE_API_BASE=https://your-backend.onrender.com/api  # Production
```

## 🔌 API Reference

### Authentication
```http
POST   /api/auth/register    # Create new user account
POST   /api/auth/login       # Authenticate user
```

### Products
```http
GET    /api/products          # List all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (vendor only)
PUT    /api/products/:id      # Update product (owner only)
DELETE /api/products/:id      # Delete product (owner only)
```

### Insights
```http
GET    /api/insights/sustainability    # Platform sustainability metrics
GET    /api/insights/user-impact       # User-specific impact data
```

### AI Chat
```http
POST   /api/chat/message      # Send message to AI assistant
```

### Health
```http
GET    /api/health            # Service health check
```

**Authentication**: Include JWT token in header for protected endpoints:
```http
Authorization: Bearer <your_jwt_token>
```

## 🚀 Deployment

### Frontend → Vercel

1. Connect GitHub repository to Vercel
2. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Set environment variables:
   - `VITE_API_BASE`: Your backend API URL
4. Deploy

**Production URL**: https://cirqlex-group11project.vercel.app

### Backend → Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Configure settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment**: Python 3
4. Set environment variables (all from `.env` template)
5. Deploy

**Production URL**: https://cirqlex-group11project.onrender.com

### Database → Render PostgreSQL

1. Create PostgreSQL database on Render
2. Copy Internal Database URL
3. Add as `DATABASE_URL` in backend environment variables
4. Run migrations:
```bash
flask db upgrade
```

## 🧪 Development

### Running Tests
```bash
cd server
pytest -v                    # Run all tests
pytest app/tests/           # Run specific directory
pytest -k "test_auth"       # Run tests matching pattern
```

### Code Quality
```bash
# Frontend linting
cd client
npm run lint

# Backend formatting (if configured)
cd server
black app/
flake8 app/
```

### Database Migrations
```bash
cd server
flask db migrate -m "Description of changes"
flask db upgrade
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build/config changes

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 👥 Team

**Group 11** - Software Engineering Project

## 🙏 Acknowledgments

- OpenAI for GPT integration
- shadcn/ui for component library
- Vercel and Render for hosting
- Open source community

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/tronzee-star/cirqlex-group11project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tronzee-star/cirqlex-group11project/discussions)

---

**Built with 💚 for a sustainable future** | [Live Demo](https://cirqlex-group11project.vercel.app)
