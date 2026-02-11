
# ISOMP - Inclusive Social Media Platform

<div align="center">
  <img src="./assets/isomp-logo.png" alt="ISOMP Logo" width="200">
  
  ### Bridging Abilities, Building Community
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-green.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  [![Built with Love](https://img.shields.io/badge/Built_with-❤️-red.svg)](https://github.com/yourusername/isomp)
</div>

## 🌟 About ISOMP

**ISOMP** (Inclusive Social Media Platform) is a groundbreaking social media application designed to celebrate and empower specially-abled individuals. Our mission is to create a truly inclusive digital space where people of all abilities can connect, share, and thrive as influencers and community members.

### The Challenge We're Addressing
While technology has revolutionized communication, it often fails the disability community by offering single-modality solutions that don't account for diverse needs. Many assistive tools target only one group (e.g., systems relying solely on speech, text, or vision), leaving out individuals who cannot use that specific mode. This fragmentation creates barriers in daily life, communication, learning, and independence.

### Our Vision
ISOMP breaks these barriers by designing across abilities rather than for single disabilities. We're creating a multimodal platform that adapts to individual needs, supporting diverse communication methods and enabling full participation in digital social spaces.

## 🎯 Key Features

### 🗣️ Multimodal Accessibility Suite
| Feature | Description | Target Users |
|---------|-------------|--------------|
| **Text-to-Speech** | Converts all written content to natural-sounding audio with multi-language support | Visually impaired, dyslexic users |
| **Image-to-Speech** | AI-powered visual descriptions of images and videos | Blind users |
| **Sign Language to Captions** | Real-time translation of sign language videos to text captions | Deaf community, allies |
| **Speech to Transcript** | Automatic transcription of audio/video content | Hearing impaired users |
| **Eye-Tracking Navigation** | Hands-free navigation using gaze detection with dwell control | Motor impaired users |
| **Voice Navigation** | Complete app control through voice commands | Visually impaired, motor impaired |
| **Gesture Mapping** | Head tilt and simple gesture controls for navigation | Motor impaired users |

### 🤝 Community & Social Features
- **Adaptive Feed**: Personalized content based on abilities and preferences
- **Specialized Channels**: Dedicated communities for different ability groups
- **Event Booking System**: Community meetups, workshops, and social events
- **Cross-Ability Communication**: Automatic format conversion between different communication styles

## 🎨 UI/UX Overview

### Key Screens

#### 🏠 Explore (Main Feed)
<div align="center">
  <img src="./assets/explore-page.png" alt="Explore Page Preview" width="400">
</div>

**Purpose**: Single-column feed to minimize distractions while browsing content

**Features**:
- Mixed content types: Text (Twitter-style), Video (TikTok-style), Images (Instagram-style)
- Each post includes: Content, caption, engagement metrics (likes/comments/shares)
- Left-side navigation: Profile, Explore, Channels, Create
- Right-side accessibility panel: All assistive tools in one accessible location

#### 👤 Personal Profile
**Features**:
- Profile details: Picture, name, follower counts, bio
- 3×3 grid layout for personal posts
- Full post expansion on click
- Profile customization options

#### 📺 Channels Page
**Features**:
- Community channels: Deaf community, Blind community, Neurodivergent community, etc.
- Channel selection with live broadcast preview
- Events component for community activities
- Easy booking system access

#### 📅 Booking System
**Features**:
- Event listings for community channels
- "Interested" button for RSVP
- Event details and images
- Seamless navigation back to channels

## 🛠️ Tech Stack

### 1. Frontend Environment
* **Framework:** React 18 (Vite)
* **Language:** JavaScript (ES6+)
* **Styling:** Tailwind CSS
* **Component Library:** Shadcn/ui
* **Icons:** Lucide-React
* **State Management:** Context API / Zustand

### 2. Backend & AI Layer
* **Server:** FastAPI (Python 3.10+)
* **ML Integration:** MediaPipe (Vision), OpenAI/Anthropic SDK (LLM)
* **Schema Validation:** Pydantic
    * *Definition:* **Pydantic** is a data validation and settings management library for Python that enforces type hints at runtime.

### 3. Communication & Infrastructure
* **API Protocol:** REST (JSON)
* **Client:** Axios
* **Deployment:** Vercel (Frontend), Railway (Backend)
* **Version Control:** Git / GitHub

### 4. Development Standards
* **Linting:** ESLint
* **Formatting:** Prettier
* **Naming:** 
    * Components: PascalCase
    * Variables/Functions: camelCase
    * Constants: UPPER_SNAKE_CASE

## 👥 User Personas

### Enhanced User Journey

#### 1. Adaptive Onboarding
```
New User → Universal Prompt → Ability Selection → Feature Configuration
```
- **Visual Impairment Path**: Auto-enables Text-to-Speech, Image-to-Speech, Voice Navigation
- **Hearing Impairment Path**: Auto-enables Sign-to-Caption, Speech-to-Transcript
- **Motor Impairment Path**: Triggers MediaPipe calibration for eye/gesture tracking

#### 2. Adaptive Content Consumption
- **Blind User**: Voice commands → Image descriptions → Audio captions
- **Deaf User**: Visual content → Sign language captions → Text transcripts
- **Motor Impaired**: Eye gaze → Dwell timer → Hands-free interaction

#### 3. Inclusive Content Creation
- **Mute/Deaf User**: Sign language video → Auto-caption generation → Post
- **Motor Impaired User**: Voice commands → Speech-to-text → Post creation
- **Dyslexic User**: Voice recording → Transcript → Multi-format post

## 📋 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.10+ (for backend/AI components)
- Webcam/microphone for accessibility features

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/isomp.git
cd isomp

# Install frontend dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start frontend development server
npm run dev

# Start backend server (in separate terminal)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### ML Component Setup
```bash
# Install Python dependencies for AI features
cd backend
pip install mediapipe openai anthropic

# Start FastAPI server with AI capabilities
uvicorn main:app --reload --port 8000
```

## 🧪 Testing & Accessibility

### Automated Testing
```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
pytest

# Run accessibility tests
npm run test:a11y
```

### Development Standards
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Manual Accessibility Testing
- **Screen Readers**: Test with NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: Full feature access via keyboard
- **Color Contrast**: Verify with WCAG contrast checkers
- **Mobile Responsiveness**: Test across different screen sizes



## 🙏 Acknowledgments

- **MediaPipe** by Google for computer vision capabilities
- **FastAPI & Pydantic** for robust backend development
- **Shadcn/ui & Tailwind** for accessible UI components
- **WCAG Guidelines** for accessibility standards
- **The Disability Community** for their invaluable insights and feedback


<div align="center">
  <h3>Building a World Where Everyone Can Connect</h3>
  
  <p>
    <em>ISOMP is more than an app—it's a movement toward true digital inclusion.</em>
  </p>
  
  <p>
    <a href="#isomp---inclusive-social-media-platform">Back to top ↑</a>
  </p>
</div>
```