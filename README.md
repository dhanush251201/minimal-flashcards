# Flash-Decks - Flashcard Learning Application

![CI Pipeline](https://github.com/goosen78/5980-ai-capstone/actions/workflows/ci.yml/badge.svg)

A modern, minimalist flashcard application built with React and FastAPI. Create decks, add flashcards, and review them with a clean, intuitive interface.

## Features

- **User Authentication**: Simple signup/login system (no password validation in basic version)
- **Deck Management**: Create, edit, and delete flashcard decks
- **Card Management**: Add, edit, and delete flashcards within decks
- **Review Mode**: Study your flashcards with a simple card-flipping interface
- **Clean UI**: Modern, light-themed interface with intuitive navigation
- **Activity Tracking**: View your study activity (static display)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Axios** for HTTP requests
- **Heroicons** for icons
- **Pure CSS** for styling

### Backend
- **FastAPI** (Python) for REST API
- **SQLModel** for ORM and database models
- **PostgreSQL** for database
- **Pydantic** for data validation
- **Uvicorn** as ASGI server

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **PostgreSQL** (v15 or higher) or **Docker**
- **npm** or **yarn**

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
```bash
cp .env.example .env
```
Edit `.env` and update:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET_KEY` and `JWT_REFRESH_SECRET_KEY`: Change these in production!

5. **Set up PostgreSQL:**

**Option A: Using Docker (Recommended for Development)**
```bash
docker run -d \
  --name flashdecks-postgres \
  -e POSTGRES_USER=flashdecks \
  -e POSTGRES_PASSWORD=flashdecks \
  -e POSTGRES_DB=flashdecks \
  -p 5432:5432 \
  postgres:15-alpine
```

**Option B: Local PostgreSQL Installation**
```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15

# Create database and user
createdb flashdecks
psql flashdecks -c "CREATE USER flashdecks WITH PASSWORD 'flashdecks';"
psql flashdecks -c "GRANT ALL PRIVILEGES ON DATABASE flashdecks TO flashdecks;"
```

6. Run database migrations:
```bash
alembic upgrade head
```

7. Run the backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. **Landing Page**: Open http://localhost:5173 to see the landing page
2. **Login/Signup**: Click "Log in" or "Sign up" - both will take you directly to the dashboard (no authentication required)
3. **Dashboard**: View your stats and existing decks
4. **Create a Deck**: Click "New Deck" to create a flashcard deck
5. **Add Cards**: Click on a deck, then click "Add Card" to create flashcards
6. **Review**: Click "Start Review" to study your cards
7. **Edit/Delete**: Use the "Edit" and "Delete" buttons to manage your decks and cards

## Project Structure

```
flashcards-app-minimal/
├── backend/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── core/             # Core configuration
│   │   ├── db/               # Database setup
│   │   ├── models/           # SQLModel models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   └── main.py           # FastAPI app entry point
│   ├── tests/                # Backend tests
│   ├── requirements.txt      # Python dependencies
│   └── flashdecks.db         # SQLite database (auto-generated)
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utilities and API client
│   │   ├── types/            # TypeScript types
│   │   └── App.tsx           # Main app component
│   ├── public/               # Static assets
│   ├── package.json          # npm dependencies
│   └── vite.config.ts        # Vite configuration
└── PROMPT.md                 # Project specifications
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Create a new user account
- `POST /auth/login` - Login and receive JWT token

### Decks
- `GET /decks` - List all decks
- `GET /decks/{deck_id}` - Get deck details with cards
- `POST /decks` - Create a new deck
- `PUT /decks/{deck_id}` - Update deck
- `DELETE /decks/{deck_id}` - Delete deck

### Cards
- `POST /decks/{deck_id}/cards` - Add card to deck
- `PUT /decks/cards/{card_id}` - Update card
- `DELETE /decks/{deck_id}/cards/{card_id}` - Delete card

### Study Sessions
- `POST /study/sessions` - Create study session
- `GET /study/sessions/{session_id}` - Get session details
- `GET /study/sessions/{session_id}/cards` - Get cards for session

## Development Notes

### Database
- The application uses PostgreSQL as the database
- Make sure PostgreSQL is running before starting the backend
- Database schema is managed through Alembic migrations
- To reset the database, drop and recreate it, then run migrations again

### Default User
- Email: `student@flashdecks.com`
- Password: `password123`
- A default user is automatically created on first run

### Static Data
- Activity chart shows static data (not connected to actual usage)
- Streak counter is static
- These are placeholders for a future implementation

## Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Type Checking
```bash
cd frontend
npm run type-check
```

## Known Limitations (Basic Version)

This is a simplified version intended for educational purposes. The following features are not implemented:
- No dark mode
- No AI features (deck generation, answer checking)
- Only basic card types (no multiple choice, cloze, etc.)
- No practice or exam modes
- No card flagging
- No CI/CD pipeline
- Limited test coverage
- Activity and streak are static displays

## Future Enhancements

For a complete version, consider adding:
- Dark mode toggle
- AI-powered deck generation
- AI-based answer checking
- Multiple card types (multiple choice, cloze, short answer)
- Practice and exam study modes
- Card flagging for review
- Real-time activity tracking
- Spaced repetition algorithm
- Docker containerization
- CI/CD pipeline
- Comprehensive test suite

## License

This project is for educational purposes.

## Support

For issues or questions, please refer to the PROMPT.md file for project specifications.
