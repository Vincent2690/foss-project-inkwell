HostelFinder – Web Application

HostelFinder is a web-based platform designed to help off-campus students easily find verified hostel accommodations. Landlords can list available hostels, students can review them, and administrators ensure listings are authentic before going live.

Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Functional Requirements Summary](#functional-requirements-summary)
- [Non-Functional Requirements Summary](#non-functional-requirements-summary)
- [Business Rules](#business-rules)
- [Installation & Setup](#installation--setup)
- [Contributors](#contributors)
- [License](#license)

---

Introduction

Purpose
This project’s aim is to provide off-campus students with a transparent and reliable platform to find verified hostels. This README focuses on installation, setup, and project usage.

Scope
HostelFinder allows:
- Students to search, filter, and review hostels  
- Landlords to create and manage listings  
- Admins to verify listings and manage user accounts  

Note: Payments, chat, and real-time booking are not included in Version 1.

---

Features

Students
- Search and filter hostels  
- View detailed hostel information  
- Post one review per hostel  
- Edit or delete reviews  

Landlords
- Create, edit, and delete hostel listings  
- Upload up to 5 images  
- Receive admin approval notifications  

Admins
- Approve/reject listings  
- Manage users  
- Remove inappropriate reviews  
- Flag suspicious or duplicate listings  

---

System Architecture

HostelFinder consists of:

1. Frontend
   - HTML, CSS, JavaScript, Bootstrap  

2. Backend
   - Django or Laravel  
   - REST API  

3. Database
   - MySQL or SQLite  

Hosting Options: Render, PythonAnywhere, or other lightweight cloud providers.

---

Technologies Used
- Frontend: HTML, CSS, JavaScript, Bootstrap  
- Backend: Django (Python) or Laravel (PHP)  
- Database: MySQL / SQLite  
- Deployment: Render, PythonAnywhere  
- Security: bcrypt/PBKDF2 hashing, CSRF protection, XSS prevention  

---

Functional Requirements Summary

Authentication
- Register, log in, log out  
- Unique email validation  
- Password recovery  
- Secure user sessions  

Profile Management
- View and update profile  
- Role and email locked (admin-only change)  

Hostel Listings
- Add, edit, delete listings  
- Up to 5 images  
- Admin approval workflow  
- Search and filter  

Reviews
- One review per user per hostel  
- 1–5 star rating  
- Edit or delete reviews  
- Admin moderation  

Admin Tools
- Approve/reject listings  
- Manage users  
- Remove fake listings or reviews  

---

Non-Functional Requirements Summary

- Performance: Search results within 3 seconds  
- Security: Password hashing, CSRF, XSS, SQL injection protection  
- Usability: Clean UI, clear feedback messages  
- Reliability: Minimum 95% uptime  
- Maintainability: Modular code, style guide compliance  
- Scalability: Minimal restructuring for new features  
- Accessibility: Basic WCAG 2.1 compliance  

---

Business Rules
- Landlords cannot review their own hostels  
- Listings must be admin-approved  
- User roles cannot be changed after registration  
- Only one review per hostel per user  

---

Installation & Setup

1. Clone the Repository
```bash
git clone https://github.com/your-repo/HostelFinder.git
cd HostelFinder

```
2. Backend Setup (Django Example)
```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

[Contributors](./CONTRIBUTORS.md)




