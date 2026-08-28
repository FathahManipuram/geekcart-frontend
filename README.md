🛒 GeekCart — Frontend

GeekCart is a full-stack e-commerce web application built with React.

This repository contains the frontend application, including the customer shopping experience and the admin management interface.

The frontend follows a modular feature-based architecture, where each business feature contains its own API layer, components, pages, state management, and validations.

🌐 Live Application

Frontend:
https://geekcart.fathahmpm.in/

Backend Repository:
https://github.com/FathahManipuram/geekcart-backend

✨ Features
👤 User Features
User registration and login
Google authentication
JWT-based authentication
User profile management
Profile image upload
Email change and verification
Password change
Address management
Product browsing
Product details
Product variants
Color and size selection
Product search
Product filtering
Similar products
Shopping cart
Wishlist
Checkout
Razorpay payment
Cash on Delivery
Wallet payments
Order history
Order tracking
Order cancellation
Item-level cancellation
Product returns
Wallet
Wallet transactions
Wallet top-up
Referral and rewards
Coupons
Offers
Real-time notifications
📦 Order Management

GeekCart includes comprehensive order management functionality:

Order creation
Order history
Order status tracking
Item-level status management
Order cancellation
Item-level cancellation
Coupon-aware cancellation rules
Return requests
Refund processing
Stock restoration
Coupon-aware Cancellation

When an applied coupon does not allow individual item cancellation, the user is required to cancel the entire order instead of cancelling an individual item.

🔔 Real-Time Notifications

GeekCart uses Socket.IO for real-time user notifications.

Admin updates order
        ↓
Backend creates notification
        ↓
Notification saved
        ↓
Socket.IO emits event
        ↓
Frontend receives notification
        ↓
Zustand notification store updates
        ↓
Unread count increases
        ↓
Notification appears in UI

Users can:

View unread notifications
View all notifications
Mark individual notifications as read
Mark all notifications as read
Receive notifications in real time
Refresh notifications when opening the notification panel
👨‍💼 Admin Features

The frontend contains a dedicated admin-side feature structure.

Admin Modules
Dashboard
User management
Category management
Product management
Order management
Return management
Coupon management
Offer management
Sales reports

Admin functionality is separated from user-side functionality to maintain clear separation of responsibilities.

🏗️ Frontend Architecture

GeekCart follows a modular feature-based architecture.

Instead of placing all components, pages, API functions, and stores into global folders, functionality is grouped according to business features.

src/
├── app/
│
├── features/
│   │
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── validations/
│   │
│   ├── admin-side/
│   │   ├── category-management/
│   │   ├── coupon-management/
│   │   ├── dashboard/
│   │   ├── offer-management/
│   │   ├── order-management/
│   │   ├── product-management/
│   │   ├── return-management/
│   │   └── user-management/
│   │
│   └── user-side/
│       ├── account/
│       ├── cart/
│       ├── checkout/
│       ├── collections/
│       ├── order/
│       ├── payment/
│       ├── products/
│       ├── referral-rewards/
│       ├── return/
│       ├── wallet/
│       └── wishlist/
│
├── lib/
├── services/
├── shared/
├── socket/
├── styles/
│
├── App.jsx
└── main.jsx
📦 Feature Structure

Most features follow a structure similar to:

feature/
├── api/
├── components/
├── pages/
├── store/
└── validations/
api/

Contains API functions related to the feature.

products/
└── api/
    └── product.api.js
components/

Contains UI components specific to the feature.

products/
└── components/
    ├── ProductCard.jsx
    ├── ProductGallery.jsx
    └── ProductDetails.jsx
pages/

Contains route-level pages for the feature.

store/

Contains Zustand state management related to the feature.

validations/

Contains form validation schemas and validation logic.

This structure keeps feature-specific functionality together and makes the application easier to maintain, test, and extend.

🧩 Shared Layer

The shared directory contains reusable functionality used across multiple features.

src/
└── shared/

This includes reusable UI components, utilities, constants, and other common functionality.

🔌 Socket Layer

Real-time communication is separated into its own socket module.

src/
└── socket/
    ├── socket.js
    └── socketProvider.jsx

The Socket Provider manages the client-side Socket.IO connection and listens for real-time events.

Socket.IO Server
       ↓
Socket Provider
       ↓
Notification Event
       ↓
Notification Store
       ↓
Notification UI
🗃️ State Management

GeekCart uses Zustand for client-side state management.

Feature-specific state is maintained inside the corresponding feature module.

Examples:

cart/
└── store/
    └── cart.store.js
products/
└── store/
    └── product.store.js
notification/
└── store/
    └── notification.store.js

This keeps state management close to the feature that owns it.

🛠️ Tech Stack
Frontend
React
Vite
React Router
Zustand
Axios
UI
Tailwind CSS
shadcn/ui
Lucide React
Sonner
Real-Time Communication
Socket.IO Client
Utilities
date-fns
Payments
Razorpay
📱 Responsive Design

The application is designed for:

Desktop
Tablet
Mobile

Responsive layouts are implemented across navigation, product browsing, product details, cart, checkout, and other user-facing features.

🔐 Authentication

The frontend supports:

Standard authentication
Google authentication
JWT-based authentication
User session management
Protected routes
Admin/user route separation

Authentication state is managed through the authentication store.

💳 Payments

GeekCart supports:

Razorpay payments
Cash on Delivery
Wallet payments

The frontend communicates with the backend for payment creation, verification, and order processing.

🛒 Shopping Flow

The main customer shopping flow is:

Home
 ↓
Collections
 ↓
Product Details
 ↓
Select Variant
 ↓
Add to Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order Created
 ↓
Order Tracking
⚙️ Installation
1. Clone the repository
git clone YOUR_FRONTEND_REPOSITORY_URL
2. Navigate to the project
cd geekcart-frontend
3. Install dependencies
npm install
🔐 Environment Variables

Create a .env.development file for local development.

VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000


📁 Environment Configuration

The project uses environment-specific configuration:

.env.example
.env.development
.env.production

Use .env.example as a reference when configuring the project locally.

▶️ Running the Application
Development
npm run dev

The application will normally be available at:

http://localhost:5173
Production Build
npm run build
Preview Production Build
npm run preview
🔗 Backend

The frontend communicates with a separate GeekCart backend.

GeekCart Frontend
        │
        │ REST API
        ↓
GeekCart Backend
        │
        ├── MongoDB
        ├── Razorpay
        ├── Cloudinary
        └── Socket.IO

Backend Repository:
https://github.com/FathahManipuram/geekcart-backend

User
<img width="1919" height="824" alt="Screenshot 2026-08-28 105543" src="https://github.com/user-attachments/assets/4ce8a1d7-816b-4c32-8854-556e5e83892e" />
<img width="1913" height="866" alt="Screenshot 2026-08-28 105632" src="https://github.com/user-attachments/assets/71f1d8d6-0596-4eb2-8422-c4d333f71973" />
<img width="1343" height="742" alt="Screenshot 2026-08-28 111011" src="https://github.com/user-attachments/assets/e96c40ce-0a4e-42d7-8705-1486df954646" />

<img width="1351" height="747" alt="Screenshot 2026-08-28 105946" src="https://github.com/user-attachments/assets/e2957fb1-dbb4-4560-b7e6-01094323384c" />
<img width="1348" height="749" alt="Screenshot 2026-08-28 110000" src="https://github.com/user-attachments/assets/2acd355e-14fb-45d7-8ce5-aee1765ba004" />
<img width="1343" height="742" alt="Screenshot 2026-08-28 110038" src="https://github.com/user-attachments/assets/8e2f850f-d992-4cb8-ae55-8a9a9e324f5e" />

<img width="1262" height="808" alt="Screenshot 2026-08-28 110118" src="https://github.com/user-attachments/assets/3f028b95-cc95-4578-beea-41d78ec99220" />
<img width="1341" height="745" alt="Screenshot 2026-08-28 110203" src="https://github.com/user-attachments/assets/cf737496-467e-4373-810c-ff7cc6e296b1" />
<img width="1345" height="743" alt="Screenshot 2026-08-28 110344" src="https://github.com/user-attachments/assets/76fa24ba-a346-4799-a482-732ab3d93959" />

<img width="1365" height="748" alt="Screenshot 2026-08-28 110537" src="https://github.com/user-attachments/assets/852fe9a4-f8fb-4254-8dc8-82d93688a414" />
<img width="1354" height="738" alt="Screenshot 2026-08-28 110621" src="https://github.com/user-attachments/assets/b068bdde-65b0-4b13-af39-5f83433b4fd6" />

Admin
<img width="1344" height="744" alt="Screenshot 2026-08-28 111404" src="https://github.com/user-attachments/assets/8a7dddd8-6eb1-4ed4-b041-d027109a7fcb" />
<img width="1345" height="739" alt="Screenshot 2026-08-28 111421" src="https://github.com/user-attachments/assets/0e569576-5ea7-46d8-8d28-53485f83ee91" />
<img width="1340" height="743" alt="Screenshot 2026-08-28 111444" src="https://github.com/user-attachments/assets/62320522-6b37-40f9-967c-5a5b96dcc57f" />


🧪 Development Practices

The frontend follows:

Modular feature-based architecture
Separation of UI and business logic
Feature-specific state management
Reusable shared components
Centralized API services
Protected routes
Environment-based configuration
Responsive UI design
Real-time event handling
Separation of admin and user functionality
🚀 Project Goals

GeekCart was developed as a full-stack e-commerce project with a focus on:

Scalable frontend architecture
Clean separation of features
Reusable components
State management
Real-time communication
Payment integration
Order and return management
Coupon-aware business rules
Admin management
Responsive user experience

👨‍💻 Author

Abdul Fathah M T

GitHub: [Fathah Manipuram](https://github.com/FathahManipuram)

LinkedIn: [Fathah Manipuram](https://www.linkedin.com/in/fathah-manipuram-b7313b207/)
