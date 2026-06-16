# CrowdQuest API

A REST API built with Node.js, Express, Prisma ORM, and PostgreSQL powering CrowdQuest, a "Where's Waldo?"-style hidden character game.

The API handles game sessions, coordinate-based character validation, progress tracking, and completion timing.

The current version includes a single playable map, with support for expanding into multiple maps and a leaderboard system as the project scales.

---

## Live API

[CrowdQuest API](https://crowdquest-api.onrender.com)

---

## Project Structure

```text
CrowdQuest
├── Frontend (Next.js)
└── Backend API (Express + Prisma)
```

---

## Features

* Hidden character gameplay system
* Game session tracking
* Coordinate-based hit validation
* Character discovery tracking
* Automatic game completion detection
* Score calculation based on completion time
* Responsive gameplay across desktop, tablet, and mobile
* PostgreSQL database with Prisma ORM
* Supabase Storage for image assets
* REST API architecture

---

## Tech Stack

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Supabase Storage
* Render (Deployment)

---

## API Overview

Base URL:
`/api`

### Images

* `GET /images` → Get all playable maps
* `GET /images/:id` → Get image + characters

### Game Session

* `POST /session/start` → Start a new game session

### Validation

* `POST /validation/check-hit` → Validate character selection

### Leaderboard (Planned)

* `GET /leaderboard` → Get top scores *(planned)*
* `POST /leaderboard` → Submit score *(planned)*

---

## Core Flow

1. Player selects an image
2. Game session starts
3. Characters are loaded with hidden coordinates
4. Player interacts with image (click/tap supported across devices)
5. API validates selection using coordinate bounds
6. Progress is tracked per session
7. Completion time is calculated when all characters are found

---

## Database Overview

* **GameImage** → Playable maps
* **Character** → Hidden targets with coordinate boundaries
* **GameSession** → Active game sessions
* **FoundCharacter** → Discovered characters per session

---

## Environment Variables

```env
DATABASE_URL=
PORT=
```

Frontend:

```env
NEXT_PUBLIC_API_URL=
```

---

## Related Projects

* Frontend: https://github.com/MrVyde/crowd-quest

## Roadmap

* Leaderboard system (score ranking by completion time)
* Multiple maps and difficulty scaling
* Expanded image library
* User accounts and persistent profiles
