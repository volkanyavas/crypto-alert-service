# 📈 Crypto Alert Service

This is a backend service built for a real-time cryptocurrency price alert system.  
It allows users to register, login, and create alerts based on specific price thresholds.  
When the alert is triggered (e.g. BTC price goes above $60,000), the system sends a webhook payload to a user-defined URL.

> ❗ Note: No frontend interface was developed. The webhook integration serves as a _visible and interactive notification mechanism_ for demonstration purposes.

---

## 🧩 Purpose of the Project

This application is built as part of a backend engineering case study.  
It demonstrates full-stack backend capabilities including:

- Secure user management (JWT + bcrypt)
- Real-time price fetching (via CoinGecko)
- Event-driven alert triggers
- Webhook notification delivery
- Swagger API documentation
- Dockerized environment with PostgreSQL
- GitHub Actions CI/CD pipeline
- Full TypeScript support
- Prisma ORM & database migrations
- Modular structure with clean architecture

---

## 🛠️ Technologies Used

| Tech              | Description                        |
| ----------------- | ---------------------------------- |
| Node.js & Express | Server framework (with TypeScript) |
| PostgreSQL        | Relational database                |
| Prisma ORM        | DB schema & query handling         |
| JWT & Bcrypt      | Auth and password hashing          |
| CoinGecko API     | Crypto price source                |
| Webhook Support   | Alert notification system          |
| Swagger           | API documentation interface        |
| Docker & Compose  | Containerization of app + database |
| GitHub Actions    | CI/CD pipeline                     |
| Jest              | Unit & integration testing         |

---

## 🚀 Setup Instructions

### 🔧 Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/crypto-alert-service.git
cd crypto-alert-service
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/crypto_alert
JWT_SECRET=your_jwt_secret
```

4. **Run Prisma migration**

```bash
npx prisma migrate dev --name init
```

5. **Start the development server**

```bash
npm run dev
```

> Visit: `http://localhost:3000/docs` to access Swagger UI

---

### 🐳 Docker Setup

To run using Docker:

```bash
docker-compose up --build
```

Ensure `.env` is correctly set (use default `postgres:password`).

---

## 📚 API Documentation

### Swagger UI

Access full API documentation at:

```
http://localhost:3000/docs
```

Provides:

- Full list of endpoints
- Request/response schema
- Try-it-out interface
- Auth token input

---

## 🔒 Authentication

- Register at `/api/users/register`
- Login at `/api/users/login` → returns a JWT token
- Use this token as Bearer for protected endpoints

Example:

```http
Authorization: Bearer <your-jwt-token>
```

---

## ✉️ Webhook Alerts

When an alert is triggered:

- A POST request is sent to the user-defined `webhookUrl`
- Payload includes: symbol, direction, target price, current price

> ✅ Purpose: Since there's no frontend, this feature **serves as a visible, interactive alerting system** (e.g., using [webhook.site](https://webhook.site)).

---

## 🧪 Testing

Run unit + integration tests:

```bash
npm test
```

Uses [Jest](https://jestjs.io/) for both service and controller-level testing.

---

## ✅ CI/CD

GitHub Actions (`.github/workflows/nodejs.yml`) runs on:

- Pull requests
- Pushes to `main`

Steps:

- Install deps
- Lint check
- Run tests
- Build Docker image

---

## 📦 Project Structure

```
src/
├── api/
│   ├── users/            # User routes & controllers
│   └── alerts/           # Price alert logic
├── config/               # Swagger setup, JWT config
├── docs/                 # Swagger doc-only files
├── jobs/                 # Background workers (price checker)
├── index.ts              # Express app entry
```

---

## 🔐 Security Features

- Passwords hashed with bcrypt
- JWT tokens with expiration
- Secure webhook posting
- Input validation
- Error & exception handling

---

## 👨‍💻 Author & Notes

This app was developed as a take-home assignment for a backend role.  
Frontend was intentionally omitted — webhook integrations were used to _simulate real-time alert visibility._
