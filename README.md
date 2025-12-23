# Flash-Decks - Flashcard Learning Application

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

- **Node.js** (v18 or higher) - Tested with v25.2.0
- **Python** (v3.9 or higher) - Tested with v3.13.5
- **PostgreSQL** (v15 or higher) or **Docker** - Tested with Docker 28.5.2
- **npm** or **yarn** - Tested with npm 11.6.2

**Note:** For Python 3.13+, this project uses `psycopg` (v3) instead of `psycopg2-binary` for better compatibility.

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
# Upgrade pip
pip install --upgrade pip

# Install psycopg3 (required for Python 3.13+ compatibility)
pip install 'psycopg[binary]'

# Install all other dependencies
pip install fastapi==0.110.0 'uvicorn[standard]==0.29.0' alembic==1.13.1 \
  'python-jose[cryptography]==3.3.0' 'passlib[argon2]==1.7.4' argon2-cffi==23.1.0 \
  pydantic-settings==2.1.0 loguru==0.7.2 python-multipart==0.0.9 \
  email-validator==2.1.1 pytest==8.1.1 pytest-asyncio==0.23.5 \
  pytest-cov==5.0.0 faker==24.4.0

# Upgrade SQLModel for Pydantic 2.x compatibility
pip install --upgrade sqlmodel
```

4. **Set up environment variables:**

The `.env` file should already exist. Verify it contains the correct database URL:
```bash
DATABASE_URL=postgresql+psycopg://flashdecks:flashdecks@localhost:5432/flashdecks
```

Also update `alembic.ini` line 3 to use `psycopg` instead of `psycopg2`:
```
sqlalchemy.url = postgresql+psycopg://flashdecks:flashdecks@localhost:5432/flashdecks
```

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
PYTHONPATH=. alembic upgrade head
```

7. **Add missing database columns** (one-time setup):
```bash
python << 'EOF'
from sqlalchemy import create_engine, text
from app.core.config import settings

engine = create_engine(str(settings.DATABASE_URL))
with engine.connect() as conn:
    conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0"))
    conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0"))
    conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS last_activity_date DATE"))
    conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS openai_api_key VARCHAR"))
    conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS llm_provider_preference VARCHAR"))
    conn.commit()
    print("Columns added successfully!")
EOF
```

8. Run the backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at:
- API: `http://localhost:8000/api/v1`
- Swagger UI (API Docs): `http://localhost:8000/docs`
- ReDoc (Alternative API Docs): `http://localhost:8000/redoc`

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

### Verify Everything is Working

Once both servers are running:

1. **Backend API**: Visit http://localhost:8000/docs - You should see the Swagger UI with all API endpoints
2. **Frontend**: Visit http://localhost:5173 - You should see the landing page
3. **Test API**: In the Swagger UI, try the `/api/v1/decks` endpoint - it should return an empty array `[]`
4. **Login**: Click "Log in" on the frontend - you should be redirected to the dashboard

If all four checks pass, your setup is complete!

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
│   ├── alembic/              # Database migrations
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Environment variables (configure this)
│   └── alembic.ini           # Alembic configuration
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
- Email: `student@flashcards.local`
- Password: `password`
- A default user is automatically created when needed
- The app uses simplified authentication for development

### Static Data
- Activity chart shows static data (not connected to actual usage)
- Streak counter is static
- These are placeholders for a future implementation

## Troubleshooting

### Python 3.13+ Compatibility
If you encounter errors with `psycopg2-binary`, ensure you're using `psycopg` (v3):
```bash
pip install 'psycopg[binary]'
```

### Pydantic Version Issues
If you see errors like "Field requires a type annotation", upgrade SQLModel:
```bash
pip install --upgrade sqlmodel
```

### Missing Database Columns
If migrations don't create all required columns, run the manual column addition script from step 7 of the backend setup.

### ModuleNotFoundError: No module named 'app'
Always use `PYTHONPATH=.` when running alembic commands:
```bash
PYTHONPATH=. alembic upgrade head
```

### PostgreSQL Connection Refused
Make sure your PostgreSQL container is running:
```bash
docker ps | grep flashdecks-postgres
```

If not running, start it with the Docker command from step 5 of the backend setup.

## Testing

### Backend Tests
```bash
cd backend
source .venv/bin/activate

# Run all tests
DATABASE_URL="sqlite:///./test.db" pytest

# Run with verbose output
DATABASE_URL="sqlite:///./test.db" pytest -v

# Run with coverage
DATABASE_URL="sqlite:///./test.db" pytest --cov=app --cov-report=html
# View coverage report at backend/htmlcov/index.html
```

### Frontend Tests
```bash
cd frontend

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Type checking
npm run type-check
```

## Important Notes

### Database Driver
This project uses **psycopg v3** (not psycopg2-binary) for better compatibility with Python 3.13+. The `requirements.txt` file lists `psycopg2-binary==2.9.9`, but you should install `psycopg[binary]` instead as shown in the setup instructions.

### SQLModel Version
The project requires **SQLModel 0.0.27+** (not 0.0.21 as listed in requirements.txt) for compatibility with Pydantic 2.x. The upgrade command in step 3 handles this.

## Known Limitations (Basic Version)

This is a simplified version intended for educational purposes. The following features are not implemented:
- No dark mode
- No AI features (deck generation, answer checking)
- Only basic card types (no multiple choice, cloze, etc.)
- No practice or exam modes (only review mode implemented)
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
