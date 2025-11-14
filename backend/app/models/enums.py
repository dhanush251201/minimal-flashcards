from enum import Enum


class UserRole(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class CardType(str, Enum):
    BASIC = "basic"


class QuizMode(str, Enum):
    REVIEW = "review"


class QuizStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"

