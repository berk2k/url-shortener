# 🔗 URL Shortener

A simple and lightweight URL shortening service built with **React**, **Node.js**, and **SQLite**.  
Users can generate random short URLs, view their usage statistics, and get redirected to the original URL.

---

## 🚀 Features

- ✂️ Shorten long URLs into compact, shareable links
- 📊 View click statistics (number of redirects)
- 🔁 Automatic redirect to the original URL
- 🌐 REST API backend with a React frontend

---

## 🧱 Tech Stack

| Layer     | Technology       |
|-----------|------------------|
| Frontend  | React     |
| Backend   | Node.js, Express |
| Database  | SQLite           |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```
### 2. open api file and install packages
```bash
cd url-shortener.api
npm install
npm start
```
### 3. open ui file and install packages
```bash
cd ../url-shortener.ui
npm install
npm start
```
---

## 🧠 Architecture Overview
The system follows a simple three-layer architecture:
```scss
Client (React)
   ↓
Backend API (Express)
   ↓
SQLite Database
```
---
## 🔗 Data Flow
1.User submits a long URL via the frontend.

2.Frontend sends a POST request to the backend **/shorten**.

3.Backend generates a random short code and saves it to the SQLite database.

4.When a short URL is visited **/:shorten_code**, the backend redirects to the original URL.

5.Statistics (like click counts) are updated and can be retrieved via **/stats/:shorten_code**.

## 🧪 Example Usage
**Request**
POST /shorten
```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```
**Response**
```json
{
  "shortCode": "a1b2c3",
  "shortUrl": "http://localhost:3000/go/a1b2c3"
}
```
---
## 🛠 Future Improvements
 Custom short codes

 Expiration dates for short URLs

 User authentication (JWT)

 Browser/device/location-based analytics

 Docker support for easier deployment
