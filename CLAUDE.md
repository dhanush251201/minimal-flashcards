# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a simplified flashcard application built with React (TypeScript) and FastAPI (Python). It features basic flashcard creation, deck management, and a spaced repetition study system using the SM-2 algorithm. This is the minimal version intended for educational purposes - a more feature-rich version exists in the sibling `flashcards-app` directory.

**Key Simplifications:**
- Simplified authentication (auto-creates single default user)
- Only basic card types (no multiple choice, cloze, short answer)
- Only review study mode (no practice or exam modes)
- No AI features (deck generation, answer checking)
- Pure CSS styling (no Tailwind)
- Static activity/streak displays

## Technology Stack

**Frontend:**
- React 18 + TypeScript + Vite
- React Router v6 for routing
- TanStack Query (React Query) for server state
- Axios for HTTP requests
- Heroicons for icons
- Pure CSS for styling
- Vitest for testing

**Backend:**
- FastAPI (Python 3.9+)
- SQLModel (ORM) + SQLAlchemy
- PostgreSQL 15+ database
- Alembic for migrations
- JWT authentication (simplified)
- Argon2id password hashing
- pytest for testing
- Loguru for logging

## Common Development Commands

### Initial Setup

**Backend:**
```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT secrets

# Start PostgreSQL with Docker
docker run -d \
  --name flashdecks-postgres \
  -e POSTGRES_USER=flashdecks \
  -e POSTGRES_PASSWORD=flashdecks \
  -e POSTGRES_DB=flashdecks \
  -p 5432:5432 \
  postgres:15-alpine

# Run migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev  # Runs on http://localhost:5173
```

### Testing

**Backend:**
```bash
cd backend

# Run all tests with coverage
DATABASE_URL="sqlite:///./test.db" pytest

# Run specific test file
DATABASE_URL="sqlite:///./test.db" pytest tests/test_api_decks.py

# Run with verbose output
DATABASE_URL="sqlite:///./test.db" pytest -v

# Generate HTML coverage report
DATABASE_URL="sqlite:///./test.db" pytest --cov=app --cov-report=html
# View at backend/htmlcov/index.html

# Run only unit tests
DATABASE_URL="sqlite:///./test.db" pytest -m unit

# Run only integration tests
DATABASE_URL="sqlite:///./test.db" pytest -m integration
```

**Frontend:**
```bash
cd frontend

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Type check
npm run type-check
```

### Database Operations

```bash
cd backend

# Create new migration after model changes
alembic revision --autogenerate -m "description of changes"

# Apply all pending migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# View migration history
alembic history

# Reset database (careful!)
alembic downgrade base
alembic upgrade head
```

### Build and Production

**Frontend:**
```bash
cd frontend

# Build for production
npm run build  # Output in dist/

# Preview production build
npm run preview
```

**Backend:**
```bash
cd backend

# Run with production settings
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Architecture Overview

### Request Flow

1. Frontend makes HTTP request via Axios client ([apiClient.ts](frontend/src/lib/apiClient.ts))
2. Request interceptor adds JWT from cookies (simplified - auto-authenticates)
3. Backend receives request at FastAPI route ([api/routes/](backend/app/api/routes/))
4. Route handler uses dependency injection to get current user ([api/deps.py](backend/app/api/deps.py))
5. Business logic executed in service layer ([services/](backend/app/services/))
6. Database operations via SQLModel ORM
7. Response serialized using Pydantic schemas ([schemas/](backend/app/schemas/))
8. Frontend receives response, React Query updates cache

### Authentication (Simplified)

This app uses a simplified authentication system:
- **No actual signup/login validation**: [api/deps.py](backend/app/api/deps.py) auto-creates and returns a single default user
- **Default User**: `student@flashcards.local` / `password`
- **JWT tokens**: Still generated but not strictly enforced
- **No protected routes**: All routes accessible without real authentication

This simplification allows students to focus on core flashcard functionality without authentication complexity.

### Spaced Repetition System (SM-2)

The app implements a simplified SM-2 algorithm in [services/study.py](backend/app/services/study.py):

**Key Components:**
- `SRSReview` model tracks per-user-card state: repetitions, interval_days, easiness, due_at, last_quality
- `_apply_sm2()` function updates scheduling based on quality rating (0-5)
- Quality < 3 resets card to interval 1 day
- Quality ≥ 3 increases interval exponentially based on easiness factor
- Easiness factor adjusted after each review

**Study Flow:**
1. User starts review session ([POST /api/v1/study/sessions](backend/app/api/routes/study.py))
2. Frontend displays cards one at a time
3. User self-rates quality (1-5 buttons)
4. Backend records answer and updates SRS state ([record_answer()](backend/app/services/study.py:202))
5. Next due date calculated based on SM-2 algorithm
6. Session completion updates user progress and streak

### Database Models

**Core Entities:**
- `User` ([models/user.py](backend/app/models/user.py)): User accounts
- `Deck` ([models/deck.py](backend/app/models/deck.py)): Flashcard collections
- `Card` ([models/card.py](backend/app/models/card.py)): Individual flashcards (prompt/answer)
- `Tag` ([models/tag.py](backend/app/models/tag.py)): Deck categorization

**Study System:**
- `QuizSession` ([models/study.py](backend/app/models/study.py)): Study session tracking
- `QuizResponse`: Individual card answers within a session
- `SRSReview`: Spaced repetition scheduling state per user-card
- `UserDeckProgress`: Completion percentage and last studied time

**Relationships:**
- User 1→N Deck (owner)
- Deck 1→N Card
- Deck M→N Tag (via deck_tags junction table)
- User + Card → SRSReview (composite key)
- User + Deck → QuizSession 1→N QuizResponse

### Frontend Structure

**Key Patterns:**
- **Route components** in [pages/](frontend/src/pages/): Top-level page views
- **Reusable components** in [components/](frontend/src/components/): UI building blocks
- **React Query hooks** for data fetching (see [pages/DashboardPage.tsx](frontend/src/pages/DashboardPage.tsx) for examples)
- **No global auth state**: Simplified - no Zustand auth store needed
- **AppShell layout** ([components/layout/AppShell.tsx](frontend/src/components/layout/AppShell.tsx)): Wraps authenticated pages with sidebar navigation

**Routing:**
- `/` - Landing page
- `/login`, `/signup` - Auth pages (non-functional, redirect to dashboard)
- `/app/dashboard` - Main dashboard
- `/app/decks/:deckId` - Deck detail and card management
- `/app/study/:sessionId` - Active study session

### Backend Structure

**Layered Architecture:**
1. **Routes** ([api/routes/](backend/app/api/routes/)): HTTP endpoint definitions, request validation
2. **Services** ([services/](backend/app/services/)): Business logic, transactions
3. **Models** ([models/](backend/app/models/)): SQLModel database models
4. **Schemas** ([schemas/](backend/app/schemas/)): Pydantic request/response models

**Key Files:**
- [main.py](backend/app/main.py): FastAPI app creation, CORS middleware, lifespan events
- [api/api_v1.py](backend/app/api/api_v1.py): API router aggregation
- [api/deps.py](backend/app/api/deps.py): Dependency injection (database sessions, user auth)
- [core/config.py](backend/app/core/config.py): Settings from environment variables
- [core/security.py](backend/app/core/security.py): Password hashing, JWT utilities
- [db/session.py](backend/app/db/session.py): Database session management
- [db/init_db.py](backend/app/db/init_db.py): Database initialization on startup

## Environment Variables

**Backend (.env):**
```bash
DATABASE_URL=postgresql://flashdecks:flashdecks@localhost:5432/flashdecks
JWT_SECRET_KEY=change-me-in-production
JWT_REFRESH_SECRET_KEY=change-me-too-in-production
LOG_LEVEL=INFO
```

**Frontend (.env):**
```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1  # Optional, defaults to this
```

## Testing Strategy

**Backend:**
- Uses pytest with SQLite test database
- `conftest.py` provides fixtures: `db`, `client`, `test_user`
- Tests marked with `@pytest.mark.unit` or `@pytest.mark.integration`
- Coverage configured in `pytest.ini` (aim for 80%+ coverage)

**Frontend:**
- Vitest with React Testing Library
- Component tests in `src/test/`
- TypeScript type checking via `npm run type-check`

## API Documentation

When backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

**Key Endpoints:**
- `POST /api/v1/auth/signup` - Create user (simplified)
- `POST /api/v1/auth/login` - Login (simplified)
- `GET /api/v1/decks` - List user's decks
- `POST /api/v1/decks` - Create new deck
- `GET /api/v1/decks/{deck_id}` - Get deck with cards
- `POST /api/v1/decks/{deck_id}/cards` - Add card to deck
- `PUT /api/v1/decks/cards/{card_id}` - Update card
- `DELETE /api/v1/decks/{deck_id}/cards/{card_id}` - Delete card
- `POST /api/v1/study/sessions` - Start study session
- `GET /api/v1/study/sessions/{session_id}` - Get session details
- `POST /api/v1/study/sessions/{session_id}/answer` - Submit answer

## Important Notes

### Simplified vs Full Version

This is the **minimal** version. For advanced features, see `../flashcards-app/`:
- AI deck generation and answer checking
- Multiple card types (MCQ, cloze, short answer)
- Practice and exam study modes
- Card flagging system
- Real-time activity tracking
- Tailwind CSS styling
- Comprehensive test coverage (93%+)
- CI/CD pipeline

### Database Migrations

Always create migrations after changing SQLModel models:
```bash
alembic revision --autogenerate -m "describe your changes"
alembic upgrade head
```

Never edit migration files directly - regenerate them if needed.

### Default User Creation

On first startup, [db/init_db.py](backend/app/db/init_db.py) creates a default user. This happens in the FastAPI lifespan event. If database is empty, default user is auto-created on any request via [api/deps.py](backend/app/api/deps.py).

### Card Types

In this minimal version, only `CardType.BASIC` is supported ([models/enums.py](backend/app/models/enums.py)). Cards have:
- `prompt`: Question text
- `answer`: Answer text
- `type`: Always "basic"

The full version in `../flashcards-app/` supports multiple choice, cloze deletion, and short answer types.

### Study Modes

Only `QuizMode.REVIEW` is supported. The review mode:
- Shows cards one at a time
- User clicks to reveal answer
- User self-rates quality (1-5)
- SM-2 algorithm schedules next review

No practice mode (show all answers) or exam mode (timed, scored) in this minimal version.
