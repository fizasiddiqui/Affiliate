# 🚀 Affiliate++ Web App

**Affiliate++** is a full-stack web application designed to manage affiliate subscriptions and payments using Google OAuth and Razorpay integration. It includes both a **React frontend** and a **Node.js backend** with MongoDB for data persistence.

---

## 📁 Project Structure

```
Affiliate++
│
├── client/         # React Frontend
│   ├── .env        # Client environment variables
│   └── ...
│
├── server/         # Node.js Backend
│   ├── .env        # Server environment variables
│   └── ...
│
├── README.md
└── ...
```

---

## 🌐 Live Preview

This project runs locally by default.

* **Client**: `http://localhost:3000`
* **Server**: `http://localhost:5001`

---

## 🌐 Live Preview
* **Live Demo**: `https://mern-pink-six.vercel.app/`

## 🔧 Technologies Used

* **Frontend**: React.js, Axios
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: Google OAuth 2.0
* **Payments**: Razorpay (Subscription Plans)
* **Email Services**: Gmail SMTP (via App Password)

---

## 🔑 Environment Variables

### 📦 Client `.env` (React)

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_SERVER_ENDPOINT=http://localhost:5001
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id_here
REACT_APP_RAZORPAY_MONTHLY_PLAN_ID=your_monthly_plan_id_here
REACT_APP_RAZORPAY_YEARLY_PLAN_ID=your_yearly_plan_id_here
REACT_APP_RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here   # Keep this secure
REACT_APP_RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here  # NEVER expose this publicly
```

### 🛠️ Server `.env` (Node.js)

```env
CLIENT_ENDPOINT=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/your-db-name-here
GOOGLE_CLIENT_ID=your_google_client_id_here
JWT_SECRET=your_jwt_secret_here                       # Keep this secure
GMAIL_EMAIL_ID=your_email_here@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password_here       # Use App Password, not personal one
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here     # NEVER expose this publicly
RAZORPAY_MONTHLY_PLAN_ID=your_monthly_plan_id_here
RAZORPAY_YEARLY_PLAN_ID=your_yearly_plan_id_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
EMAIL_USER=your_email_here@gmail.com
EMAIL_PASS=your_email_app_password_here
NODE_ENV=production
```

---

## ⚙️ Installation & Running the Project

### 🔹 Prerequisites

* Node.js (v16+)
* MongoDB
* npm or yarn

---

### 1️⃣ Clone the Repository

```bash
https://github.com/sachinkumar012/MERN.git
cd MERN-1
```

---

### 2️⃣ Install Server Dependencies

```bash
cd server
npm install
```

### ▶️ Start the Server

```bash
node server.js
```

---

### 3️⃣ Install Client Dependencies

```bash
cd ../client
npm install
```

### ▶️ Start the Client

```bash
npm start
```

---

## 💡 Features

* 🔐 **Google Login**: Secure OAuth-based authentication.
* 💳 **Razorpay Integration**: Monthly & Yearly subscription options.
* 📧 **Email Notifications**: Sent on successful payments and login.
* 🛠️ **Webhook Handling**: Real-time Razorpay webhook processing.
* 📊 **Affiliate Dashboard**: Track plans, payments, and user data.

---

## 🧪 Test Payments (Razorpay)

Use Razorpay’s test card credentials when checking out:

* **Card Number**: `4111 1111 1111 1111`
* **CVV**: `123`
* **Expiry**: Any future date

* For any UPI
* success@okhdfcbank

---

## 🔒 Security Notice

> ⚠️ **Do not commit `.env` files to version control.** Use `.gitignore` to exclude them.
> Never expose secrets such as API keys, OAuth secrets, or passwords in code or public repositories.

---

## 🧾 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Fouziya Siddiqui**
📧 [fouziyasddiqui8298@gmail.com](mailto:fouziyasddiqui8298@gmail.com)

---

Would you like me to also create a `.gitignore` file or generate sample `.env.example` templates for sharing?
