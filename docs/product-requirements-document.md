---
description: The core product requirements and vision for ISOMP, an inclusive social media platform. Use this as the primary reference for features, user flows, and project goals.
globs: **/*
---
# Project Requirements Document

## 1. Project Overview

### Project Name
ISOMP

### Description
ISOMP is an inclusive social media platform celebrating specially-abled people. It helps specially-abled individuals become influencers by providing a platform tailored to their needs. The platform connects and brings together people of all abilities.

### Problem Statement
Technology has transformed how we communicate, learn, and navigate the world, but its potential in supporting specially-abled individuals remains under-explored.

Even when assistive tools exist, they often target only one group (e.g., speech-based systems, text-based systems, or vision-based systems), leaving out individuals who cannot use that specific mode. As a result, many specially-abled individuals still face barriers in communication, learning, daily independence, and social participation.

These challenges are intensified for individuals who rely on sign language, especially those using diverse sign language dialects. Existing solutions frequently fail to account for regional variations, non-standardized gestures, and contextual nuances.

Current assistive technologies often focus on single-modality solutions (e.g., speech-to-text, basic sign recognition, or navigation aids). This fragmentation limits real-world effectiveness and scalability.

To create meaningful accessibility, we need multimodal solutions that combine:
- Vision
- Audio
- Text
- Haptics
- AI

These systems must adapt to individual needs and enhance communication and independence.

### Main Job to Be Done
Connect the disabled community through a social media × skill-gaining platform.

### High-Level Solution
The platform includes:
- A social media feed where users can explore and post content
- Community tips and shared experiences
- Personal “day-in-the-life” influencer-style content
- Built-in accessibility tools integrated into content consumption and creation

---

## 2. Tech Stack

Refer to tech-stack.md.

---

## 3. Features and Functionalities

### Core Features
- Text-to-Speech
- Image-to-Speech
- Sign Language to Captions
- Speech-to-Transcript
- Eye Tracking Navigation
- Voice Navigation
- Personalized Feature Recommendations

---

## Feature Details

### Text-to-Speech (TTS)

**Description**
If enabled, captions and written posts are converted to speech for users with visual impairments.

**Priority:** High

**Acceptance Criteria**
- Caption speech plays after video playback
- Written posts are read aloud
- Users can choose from multiple languages

---

### Image-to-Speech

**Description**
Converts images or videos into spoken descriptions for visually impaired users.

**Priority:** High

**Acceptance Criteria**
- Image descriptions are generated before caption TTS
- Example: “A dog playing Taylor Swift’s ‘Fearless’ on a guitar.”
- Users can select language options

---

### Sign Language to Captions

**Description**
Generates written captions from sign language in video posts.

**Priority:** High

**Acceptance Criteria**
- Expandable translation section beside the post
- Enabled only for posts flagged as containing sign language
- Translation provided in user-selected language

---

### Speech-to-Transcript

**Description**
Transcribes video/audio speech into written captions.

**Priority:** High

**Acceptance Criteria**
- Expandable transcript section
- Enabled only for posts containing audio

---

### Eye Tracking Navigation

**Description**
Allows users with motor impairments to navigate via eye movement.

**Priority:** High

**Acceptance Criteria**
- Dwell timer (2 seconds) triggers selection
- Visual circular progress indicator shown
- Gesture mapping via MediaPipe
- Head tilts or hand gestures trigger actions

---

### Voice Navigation

**Description**
Allows navigation using voice commands.

**Priority:** High

**Acceptance Criteria**
- Activation via trigger phrase
- App verbally lists accessible options
- User responds with selected feature

---

### Feature Recommendation Engine

**Description**
Prompts users during onboarding to identify abilities and automatically enables recommended features.

**Priority:** High

**Acceptance Criteria**
- Visually impaired → TTS, Image-to-Speech, Voice Navigation
- Hearing impaired → Sign-to-Caption, Speech-to-Transcript
- Motor impaired → Eye Tracking
- Recommendations displayed clearly during onboarding

---

## 4. User Flow

### 4.1 User Personas
- Blind Users – Rely on audio feedback and screen readers
- Deaf / Hard-of-Hearing Users – Require captions and sign support
- Mute Users – Require TTS for communication
- Users with Motor Disabilities – Require eye-tracking or voice UI
- Neurodivergent / Dyslexic Users – Benefit from TTS and simplified UI
- Neurotypical / Allies – Use translation tools to connect inclusively

---

### 4.2 Step-by-Step User Journey

#### 1. Adaptive Onboarding & Calibration
- Universal audio + visual prompt
- Ability selection paths:
  - Visual → TTS + Image-to-Speech
  - Hearing → Sign-to-Caption + Transcript
  - Motor → MediaPipe calibration
- Eye tracking calibration via four-corner gaze test
- 2-second dwell introduction

#### 2. Adaptive Feed

Blind User:
- Voice command: "Next Post"
- Image-to-Speech describes content
- TTS reads caption

Deaf User:
- Toggle Sign-to-Caption overlay
- Expandable transcript section

Motor Impaired User:
- Eye dwell activates buttons
- Head tilt refreshes feed

---

### 4.3 Navigation Logic Table

| Interaction Mode | Navigation Trigger | Selection Method | Key Feature |
|------------------|-------------------|------------------|------------|
| Eye Tracking | Gaze | 2s Dwell | MediaPipe |
| Voice UI | Voice Prompt | Keyword | Speech-to-Text |
| Gesture Mapping | Head/Hand Movement | Movement Trigger | MediaPipe |
| Traditional | Touch/Swipe | Tap | Standard UI |

---

## 5. Technical Constraints & Edge Cases

### 5.1 Error Handling
- Calibration failure → fallback to Voice UI
- Low light warning if camera confidence < 0.6
- Low-confidence translation disclaimer

### 5.2 Privacy & Local Processing
- MediaPipe processing must occur on-device
- Raw camera frames must never be sent to backend
- Permission prompts must explain feature purpose

### 5.3 Latency Requirements
- Dwell timer feedback must be frame-perfect
- TTS must begin within 300ms of post focus

---

## 6. Development Roadmap (MVP Focus)

### Phase 1 – Bridge Features
1. Adaptive Onboarding logic
2. Text-to-Speech & Speech-to-Transcript
3. Basic MediaPipe eye tracking

### Phase 2 – Influencer Features
1. Sign-to-Caption model integration
2. Image-to-Speech via Vision-Language Model
3. Advanced gesture mapping
