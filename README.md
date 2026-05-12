# CareerPilot
### Intelligent Job Recommendation & Skill Verification System

<p align="center">
AI-powered platform for resume analysis, skill verification, and intelligent job recommendations.
</p>

---

## Overview

CareerPilot is a smart recruitment and career assistance platform that helps users identify suitable job opportunities based on their verified skills. The system analyzes uploaded resumes using NLP techniques, extracts technical skills, conducts AI-generated assessments, and recommends relevant jobs through APIs.

The platform aims to simplify the hiring process by improving candidate-job matching accuracy through automation and artificial intelligence.

---

## Problem Statement

Traditional job portals mostly depend on manual resume screening and keyword-based filtering, which often leads to inaccurate recommendations and inefficient hiring processes.

There is a need for an intelligent system that can:
- Analyze resumes automatically
- Identify technical skills accurately
- Verify candidate skill levels
- Recommend relevant job opportunities efficiently

---

## Proposed Solution

CareerPilot provides an AI-driven solution that:
- Extracts skills from resumes using NLP
- Generates skill verification assessments
- Evaluates candidate performance
- Matches users with suitable jobs
- Improves recruitment efficiency and accuracy

---

## Key Features

- Resume Upload & Parsing
- NLP-Based Skill Extraction
- AI-Generated Skill Verification Tests
- Candidate Skill Evaluation
- Intelligent Job Recommendations
- API-Based Job Fetching
- Responsive User Dashboard
- Secure Authentication System

---

## Technologies Used

| Category | Technology |
|----------|-------------|
| Frontend | React.js |
| Backend | Flask (Python) |
| Database | MongoDB / Firebase |
| AI & NLP | Python NLP Libraries |
| APIs | JSearch API |
| Styling | CSS / Tailwind CSS |
| Version Control | Git & GitHub |

---

## System Requirements

### Hardware
- Minimum 4GB RAM
- Dual-Core Processor
- Stable Internet Connection

### Software
- Python 3.x
- Node.js & npm
- MongoDB / Firebase
- Git
- VS Code

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/careerpilot.git
cd careerpilot
```

---

### 2. Install Frontend Dependencies

Since `node_modules` is included in `.gitignore`, install dependencies manually after cloning the repository.

```bash
cd frontend
npm install
```

If dependency conflicts occur:

```bash
npm install --legacy-peer-deps
```

Run the frontend server:

```bash
npm start
```

---

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
JSEARCH_API_KEY=your_api_key
MONGODB_URI=your_database_url
```

---

## Project Workflow

```text
Resume Upload
      ↓
Resume Parsing
      ↓
Skill Extraction using NLP
      ↓
AI-Based Skill Verification
      ↓
Performance Evaluation
      ↓
Job Recommendation using APIs
      ↓
Dashboard Display
```

---

## Future Enhancements

- Advanced AI-based Career Guidance
- Skill Gap Analysis
- LinkedIn Integration
- AI Career Assistant Chatbot
- Mobile Application Support
- Resume Score Prediction
- Machine Learning-Based Job Matching

---

## Conclusion

CareerPilot combines AI, NLP, and automation technologies to simplify the recruitment and job search process. The platform helps users validate their skills, improve career opportunities, and receive intelligent job recommendations efficiently.

---
