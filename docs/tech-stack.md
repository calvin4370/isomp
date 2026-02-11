---
description: Technical stack specifications and coding standards for ISOMP. Follow these technology choices and naming conventions for all frontend and backend development.
globs: **/*
---
# Tech Stack Specification: [ISOMP]

## 1. Frontend Environment
* **Framework:** React 18 (Vite)
* **Language:** JavaScript (ES6+)
* **Styling:** Tailwind CSS
* **Component Library:** Shadcn/ui
* **Icons:** Lucide-React
* **State Management:** Context API / Zustand

## 2. Backend & AI Layer
* **Server:** FastAPI (Python 3.10+)
* **ML Integration:** MediaPipe (Vision), OpenAI/Anthropic SDK (LLM)
* **Schema Validation:** Pydantic
    * *Definition:* **Pydantic** is a data validation and settings management library for Python that enforces type hints at runtime.
* Database: Supabase

## 3. Communication & Infrastructure
* **API Protocol:** REST (JSON)
* **Client:** Axios
* **Deployment:** Vercel (Frontend), Railway (Backend)
* **Version Control:** Git / GitHub

## 4. Development Standards
* **Linting:** ESLint
* **Formatting:** Prettier
* **Naming:** 
    * Components: PascalCase
    * Variables/Functions: camelCase
    * Constants: UPPER_SNAKE_CASE

