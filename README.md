# 🛡️ Child Welfare & Protection Portal
### (बाल कल्याण एवं बाल संरक्षण पोर्टल)

A comprehensive, full-stack digital platform engineered for child protection agencies, district welfare committees, school administrators, and Anganwadi workers to safeguard children, monitor nutritional health, flag dropout risks, and expedite emergency incident responses.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features & Modules](#-key-features--modules)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Database Schema](#-database-schema)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Environment Variables](#-environment-variables)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Running with Docker Compose](#-running-with-docker-compose)
- [Seeding Sample Data](#-seeding-sample-data)
- [License](#-license)

---

## 🌟 Overview

The **Child Welfare & Protection Portal** is designed to address key challenges in child protection and healthcare management:
- **Emergency Incident Reporting**: Swift reporting and tracking of child labor, trafficking attempts, abuse, and underage marriage.
- **Child Health & Nutrition Tracking**: Early detection of Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) through regular weight/height monitoring.
- **Dropout Risk Warning System**: Automated flagging of children with prolonged consecutive absences from schools or Anganwadi centers to prevent early dropouts and exploitation.
- **Integrated Master Directory**: Single source of truth for child demographics, guardian information, and district-level mapping.

---

## 🚀 Key Features & Modules

### 🚨 1. Emergency SOS & Incident Reporting
- Log incident reports with detailed descriptions, location markers, and reporter contact details.
- Classify incidents by type (`CHILD_LABOUR`, `TRAFFICKING_RISK`, `CHILD_MARRIAGE`, `ABUSE`, etc.).
- Automated risk classification (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
- Status workflow tracking (`OPEN`, `IN_REVIEW`, `RESOLVED`).

### 🧒 2. Child Master Directory & Registration
- Register and maintain profiles for vulnerable children.
- Record demographic information: age, gender, guardian details, village/city, district, state, and school/Anganwadi ID.
- Linked view of health, attendance, and safety history per child.

### 🥗 3. Malnutrition & Growth Monitoring
- Record age (in months), weight (in kg), and height (in cm).
- Automated health status assessment (`NORMAL`, `MODERATE`, `SEVERE_ACUTE_MALNUTRITION`).
- Longitudinal tracking to assess nutritional recovery over time.

### 🏫 4. School Attendance & Dropout Risk Warning
- Track school and Anganwadi center attendance.
- Monitor consecutive absence counts per child.
- Automatic risk flagging (`riskFlagged: true`) when threshold consecutive absences occur.

### 🌐 5. Modern Government Portal UI
- Clean, accessible user interface inspired by official welfare dashboards.
- Metric overview cards for active incidents, flagged dropout risks, SAM cases, and registered children.
- Hero notification carousel highlighting emergency helplines (e.g., **Childline 1098**).
- Multilingual accessibility support (English / Hindi UI context).

---

## 💻 Tech Stack & Architecture

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (with PostCSS & Autoprefixer)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database ORM**: Prisma ORM
- **Database**: SQLite (configurable to PostgreSQL / MySQL)
- **Architecture**: Repository & Service pattern with centralized error-handling middleware

### **DevOps & Containerization**
- **Docker**: Multi-stage `Dockerfile` for frontend (Nginx) and backend
- **Docker Compose**: Containerized multi-service deployment orchestrator
- **Deployment**: Compatible with Vercel, Docker, and traditional Node servers

---

## 📁 Project Directory Structure

```text
child-welfare/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Prisma DB Schema (SQLite)
│   │   └── seed.ts             # Database Seeding Script
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── db/                 # Prisma database client instance
│   │   ├── middleware/         # Centralized error handler & validators
│   │   ├── repositories/       # Data access interfaces & Prisma repositories
│   │   ├── routes/             # Express API routes
│   │   ├── services/           # Business logic layer
│   │   └── index.ts            # Server entrypoint
│   ├── Dockerfile              # Backend container definition
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # UI Components (Navbar, Tabs, Modals, Cards)
│   │   ├── context/            # Global state & Language context
│   │   ├── services/           # Axios API services
│   │   ├── types/              # TypeScript definitions
│   │   ├── App.tsx             # Main App layout & Tab switcher
│   │   ├── main.tsx            # Vite React DOM root
│   │   └── index.css           # Tailwind CSS styles
│   ├── Dockerfile              # Frontend container definition
│   ├── nginx.conf              # Nginx server configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── vite.config.ts          # Vite build config
├── docker-compose.yml          # Multi-container Compose configuration
├── README.md                   # Project documentation
└── .gitignore
```

---

## 🗄️ Database Schema

The database model is defined in [`backend/prisma/schema.prisma`](file:///c:/Users/anu05/OneDrive/Desktop/child%20welfare/backend/prisma/schema.prisma):

```prisma
model Child {
  id               String             @id @default(uuid())
  fullName         String
  ageYears         Int?
  gender           String?
  guardianName     String?
  guardianPhone    String?
  villageOrCity    String
  district         String
  state            String
  schoolOrCenterId String?
  createdAt        DateTime           @default(now())

  incidents        IncidentReport[]
  nutritionRecords NutritionLog[]
  attendanceLogs   AttendanceRecord[]
}

model IncidentReport {
  id            String   @id @default(uuid())
  childId       String?
  child         Child?   @relation(fields: [childId], references: [id])
  reporterName  String
  reporterPhone String
  incidentType  String
  locationDesc  String
  district      String
  riskLevel     String   @default("MEDIUM")
  status        String   @default("OPEN")
  description   String
  reportedAt    DateTime @default(now())
}

model NutritionLog {
  id         String   @id @default(uuid())
  childId    String
  child      Child    @relation(fields: [childId], references: [id])
  ageMonths  Int
  weightKg   Float
  heightCm   Float
  status     String   @default("NORMAL")
  recordedAt DateTime @default(now())
}

model AttendanceRecord {
  id                  String   @id @default(uuid())
  childId             String
  child               Child    @relation(fields: [childId], references: [id])
  schoolId            String
  consecutiveAbsences Int      @default(0)
  riskFlagged         Boolean  @default(false)
  lastAttendDate      DateTime
  updatedAt           DateTime @updatedAt
}
```

---

## 🔌 API Endpoints Reference

### **Health Check**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Check API server status |

### **Child Management** (`/api/children`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/children` | List all registered children |
| `POST` | `/api/children` | Register a new child record |
| `GET` | `/api/children/:id` | Fetch specific child details with related logs |

### **Incident Reporting & SOS** (`/api/incidents`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/incidents` | List all incident reports |
| `POST` | `/api/incidents` | Submit a new incident / emergency SOS report |
| `PUT` | `/api/incidents/:id/status` | Update incident status (`OPEN`, `IN_REVIEW`, `RESOLVED`) |

### **Nutrition & Malnutrition Logs** (`/api/nutrition`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/nutrition` | Retrieve nutrition tracking logs |
| `POST` | `/api/nutrition` | Log height/weight measurement for a child |

### **Attendance & Dropout Tracking** (`/api/attendance`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/attendance` | Retrieve attendance records and risk flags |
| `POST` | `/api/attendance` | Log or update attendance record for a child |

---

## 🔑 Environment Variables

### **Backend (`backend/.env`)**
```env
PORT=5000
DATABASE_URL="file:./dev.db"
```

### **Frontend (`frontend/.env` or Docker env)**
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🛠️ Getting Started & Local Setup

### **Prerequisites**
- **Node.js** v18.x or higher
- **npm** (v9+) or **yarn**
- **Git**

---

### **1. Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   DATABASE_URL="file:./dev.db"
   ```

4. Push Prisma schema to generate SQLite database:
   ```bash
   npx prisma db push
   ```

5. Seed the database with sample child welfare records:
   ```bash
   npm run seed
   ```

6. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Backend server will start at:* `http://localhost:5000`

---

### **2. Frontend Setup**

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Frontend application will start at:* `http://localhost:5173` (or port specified by Vite)

---

## 🐳 Running with Docker Compose

You can launch both frontend and backend services simultaneously using Docker Compose:

1. Ensure Docker Desktop is installed and running.
2. From the project root directory, run:
   ```bash
   docker-compose up --build
   ```
3. Access the services:
   - **Frontend App**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5000`
   - **Health Check**: `http://localhost:5000/health`

---

## 🌱 Seeding Sample Data

The backend includes a pre-configured seed script with realistic child protection scenarios (severe acute malnutrition cases, child labor incidents, trafficking warnings, and dropout risk alerts).

To reset and re-seed the database at any time:
```bash
cd backend
npm run seed
```

---

## 📜 License

This project is open source and available under the **ISC License**.
