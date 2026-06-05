# 🍔 FoodHub

A full-stack food ordering and delivery platform where customers can browse restaurants, place orders, and pay online — while restaurant owners manage their menus and admins oversee the entire platform.

🌐 **Live Demo:** [app-foodhub.netlify.app](https://app-foodhub.netlify.app)

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 👤 Customer
- Register & log in with email verification (via Brevo)
- Browse restaurants and menus
- Add items to cart and place orders
- Pay securely using Razorpay (test mode)
- Receive order confirmation emails via Brevo
- Track order status in real time

### 🍽️ Restaurant Owner
- Register and manage restaurant profile
- Add, edit, or remove menu items
- View and update incoming orders

### 🛠️ Admin
- Manage all users, restaurants, and orders
- Approve or suspend restaurant listings
- Monitor platform activity from a dedicated dashboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Spring Boot (Java) |
| Email Service | Brevo (email verification + order confirmation) |
| Payment Gateway | Razorpay (test integration) |
| Frontend Hosting | Netlify |
| Backend Hosting | Render |

---

## 👥 User Roles

| Role | Access |
|---|---|
| **Customer** | Browse, order, pay, track orders |
| **Restaurant Owner** | Manage restaurant, menu & orders |
| **Admin** | Full platform control & oversight |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Java 17+
- Maven
- A Razorpay test account
- A Brevo (formerly Sendinblue) account

---

### Frontend Setup

```bash
# Clone the frontend repository
git clone https://github.com/Sahillutade/FoodHub

# Install dependencies
npm install

# Start the development server
npm start
```

---

### Backend Setup

```bash
# Clone the backend repository
git clone https://github.com/Sahillutade/foodhub-backend.git
cd foodhub-backend

# Build and run
mvn spring-boot:run
```

---

## 🔐 Environment Variables

### Frontend `.env`

```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_test_key
```

### Backend `application.properties`

```properties
# Database
spring.datasource.url=your_database_url
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

# Brevo (Email)
brevo.api.key=your_brevo_api_key
brevo.sender.email=your_verified_sender@email.com

# Razorpay
razorpay.key.id=your_razorpay_test_key
razorpay.key.secret=your_razorpay_test_secret

# JWT
jwt.secret=your_jwt_secret
```

> ⚠️ Never commit `.env` or `application.properties` files with real credentials to version control.

---

## ☁️ Deployment

| Service | Platform |
|---|---|
| Frontend | [Netlify](https://netlify.com) |
| Backend | [Render](https://render.com) |

- The frontend is deployed on Netlify with continuous deployment from the frontend GitHub repository.
- The backend Spring Boot API is deployed on Render as a web service.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> 💡 **Note:** Razorpay is currently integrated in **test mode**. No real transactions are processed. Use Razorpay's [test card details](https://razorpay.com/docs/payments/payments/test-card-upi-details/) to simulate payments.
