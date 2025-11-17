# 📦 Project Structure Setup

## 🎯 Goal
Set up the initial structure for the **Personal Purchase Management Tool**, ensuring a clean, maintainable, and scalable foundation for development.

---

## 🛠 Tech Stack
- **Frontend:** React (TypeScript) with Vite  
- **Backend:** Express.js (TypeScript)  
- **Database:** PostgreSQL  
- **ORM:** Prisma  
- **Containerization:** Docker

## 🔨 Build & Run Backend ATM
- **copy env:** Copy example env to original `cp .env.example .env` and change the values for database string and secret key
- **run docker containers:** Run docker command `docker compose up --build -d'

## ⚙️ APIs
- **Register User:** `localhost:8080/api/user/register`
- **Login:** `localhost:8080/api/user/signin`
- **Add Item:** `localhost:8080/api/items/addItem`
- **Get Items by user id:** `localhost:8080/api/items/itemsByUser`
- **Get All Items:** `localhost:8080/api/items/all`
- **All items related apis need jwt token, make sure to have one from login**
