# Travel & Tourism Minor Project

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express.js
- **Database**: MySQL

---

## ⚡ Setup Instructions (Step by Step)

### Step 1: Install Required Software
1. Install **Node.js** from https://nodejs.org
2. Install **XAMPP** from https://www.apachefriends.org

### Step 2: Setup Database
1. Open XAMPP → Start **Apache** and **MySQL**
2. Open browser → go to http://localhost/phpmyadmin
3. Click "SQL" tab → Paste the contents of `database.sql` → Click **Go**

### Step 3: Install Node.js Dependencies
Open VS Code Terminal (Ctrl + `) and run:
```
npm install
```

### Step 4: Start the Server
```
node backend/server.js
```
You should see:
```
✅ MySQL Connected successfully!
🚀 Server running at http://localhost:3000
```

### Step 5: Open the Website
Go to http://localhost:3000 in your browser

---

## 📁 Project Structure
```
travel-tourism/
├── frontend/
│   ├── index.html      → Home Page
│   ├── login.html      → User Login
│   ├── register.html   → User Registration
│   ├── booking.html    → Tour Booking
│   ├── admin.html      → Admin Dashboard
│   └── style.css       → All Styles
├── backend/
│   ├── server.js       → Express Server
│   ├── db.js           → MySQL Connection
│   └── routes/
│       ├── auth.js     → Login/Register API
│       ├── destinations.js → Destinations API
│       ├── booking.js  → Booking API
│       └── admin.js    → Admin API
├── database.sql        → Database Setup Script
├── .env                → Configuration
└── package.json        → Dependencies
```

---

## 🔑 Login Credentials

### Admin Panel
- URL: http://localhost:3000/admin.html
- Username: **admin**
- Password: **admin123**

### User
- Register at: http://localhost:3000/register.html
- Login at: http://localhost:3000/login.html

---

## 🌐 All Pages
| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Login | http://localhost:3000/login.html |
| Register | http://localhost:3000/register.html |
| Book Trip | http://localhost:3000/booking.html |
| Admin | http://localhost:3000/admin.html |

---

## 📡 API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/destinations | Get all destinations |
| POST | /api/booking | Create booking |
| GET | /api/booking/my | Get user's bookings |
| POST | /api/admin/login | Admin login |
| GET | /api/admin/stats | Dashboard stats |
| GET | /api/admin/bookings | All bookings |
| GET | /api/admin/users | All users |

---
