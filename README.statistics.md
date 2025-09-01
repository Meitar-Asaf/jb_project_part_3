
# 🌍 Dreamy Vacations & 📊 Vacations Statistics — Django Web Platform


This repository contains two main web applications:

1. **Dreamy Vacations** — אתר ניהול, גלישה והזמנת חבילות חופשה (Django + HTML/CSS)
2. **Vacations Statistics** — מערכת ניהול סטטיסטיקות (Django REST + React)



## 🌐 Live Access & Ports



## 🌐 Live Access & Ports

| שירות                        | URL לדוגמה                       | פורט  | תיאור |
|------------------------------|-----------------------------------|-------|--------|
| אתר החופשות (Dreamy Vacations) | http://52.58.2.223/               | 80    | אתר ראשי (nginx מנתב ל-part_2:8080) |
| API סטטיסטיקות (Django)        | http://52.58.2.223:8000/           | 8000  | כל ה-endpoints של Django REST |
| פרונטנד סטטיסטיקות (React)     | http://52.58.2.223:81/             | 81    | ממשק גרפי לסטטיסטיקות (אם לא מוגש דרך nginx) |

### הגשת סטטיסטיקות בנתיב /statistics (רשות)
אם תרצה שהפרונטנד של הסטטיסטיקות יהיה נגיש בכתובת http://52.58.2.223/statistics/ (ולא בפורט 81), הוסף ל-nginx שלך את הבלוק הבא:

```nginx
location /statistics/ {
	proxy_pass http://statistics-frontend:80/;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
}
```

כך תוכל להיכנס לסטטיסטיקות ב- http://52.58.2.223/statistics/ במקום בפורט 81.

---


## 🌐 Live Access

שני האתרים זמינים בכתובת:

**http://52.58.2.223/**

* כדי להיכנס לאתר החופשות — פשוט גשו לכתובת הראשית והשתמשו בפרטי המשתמש/מנהל.
* כדי להיכנס לאתר הסטטיסטיקות — יש להיכנס עם משתמש מנהל בלבד (admin), דרך אותו דף התחברות.

---

## 📦 What This Project Includes

- Django REST API for statistics (vacations, users, likes, price ranges)
- React frontend for interactive charts and analytics
- Admin authentication (login required)
- Dockerized deployment (see below)

---

## 🚀 Quick Start (Local Development)

### 1. Backend (Django)

```bash
cd part_3/vacations_statistics_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Configure your database in settings.py if needed
python manage.py migrate
python manage.py loaddata initial_data.json  # If you have fixture data
python manage.py runserver 0.0.0.0:8000
```

### 2. Frontend (React)

```bash
cd part_3/vacations-statistics-frontend
npm install
npm start
```

- The React app will run on [http://localhost:3000](http://localhost:3000) by default.
- Make sure the backend is running and accessible from the frontend (CORS is configured for the public IP).

---

## 🐳 Docker Compose (Production)

To run the full stack with Docker (recommended for production):

```bash
docker-compose -f docker-compose.prod.yaml up --build
```

- The site will be available at your server's public IP (e.g., http://52.58.2.223/)
- Nginx is used as a reverse proxy for both frontend and backend.

---


## 👤 Admin & User Login Details

> ⚠️ Note: Only admin users can view the statistics dashboard. Regular users will not have access.

**Admin User**

- Email: `admin@example.com`
- Password: `Admin456!`

**Regular User**

- Email: `testuser@example.com`
- Password: `UserPass123`

Use these credentials on the login page at [http://52.58.2.223/](http://52.58.2.223/) (or your server IP). Only the admin will be able to access the dashboard; regular users will receive an error or be denied access.

---

## 📊 Statistics Provided

- Total users
- Total likes
- Likes distribution by country
- Vacation counts by price range
- Past, ongoing, and future vacations

---

## 🛠️ Troubleshooting

- If you can't access the site at the public IP, check your firewall and Docker/Nginx configuration.
- For CORS/CSRF issues, ensure the backend's `settings.py` includes your public IP in `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`.
- For database issues, verify your PostgreSQL connection settings.

---

## 📩 Questions?

For help, contact the project maintainer or your team lead.

Enjoy your analytics! 📈
