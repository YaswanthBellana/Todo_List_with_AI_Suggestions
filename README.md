# 🧠 Smart Todo List with AI Suggestions

This is a full-stack Smart Todo List web application that helps users manage tasks intelligently using AI. The system prioritizes tasks, suggests deadlines, and provides context-aware recommendations using AI models like OpenAI GPT.

## 🚀 Features

- ✅ Add, view, edit, and delete tasks
- 🧠 AI-powered task prioritization and deadline suggestions
- 🗂️ Categorization and tagging of tasks
- 📋 Daily context input (e.g. notes, emails, events)
- 📈 Responsive frontend (React + CSS)
- 🔐 Backend API built with Django REST Framework

---

## 🛠️ Tech Stack

| Layer      | Tech Used             |
|------------|-----------------------|
| Frontend   | React, CSS            |
| Backend    | Django, Django REST   |
| Database   | SQLite (for simplicity) |
| AI Engine  | OpenAI GPT API        |
| Deployment | (Optional) Render / Netlify / Vercel |

---

## ⚙️ How to Run Locally

### 🔧 Backend Setup (Django)
```bash
# 1. Clone the repo
git clone https://github.com/yourusername/smart-todo-ai.git
cd smart-todo-ai/backend

# 2. Set up virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Migrate and run
python manage.py migrate
python manage.py runserver
