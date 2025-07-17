# ecommerce-backend
# E-commerce Backend API
ecommerce-backend/
├── 📁 src/
│   ├── 📁 config/          # Environment & third-party configs
│   │   ├── db.js          # MongoDB connection
│   │   ├── env.js         # Environment variables      
│   │   ├── stripe.js      # Stripe payment config)
│   │   └── nodemailer.js     # Email service config (Nodemailer)
│   │    
│   ├── 📁 controllers/     # Route handlers (business logic)
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   │
│   ├── 📁 models/          # MongoDB schemas
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── cartModel.js
│   │   └── orderModel.js
│   │
│   ├── 📁 routes/          # API endpoints
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── 📁 middlewares/          # Custom middleware
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── adminMiddleware.js   # Role-based access
│   │   └── errorHandler.js      # Global error handler
│   │
│   ├── 📁 services/          # Reusable business logic
│   │   ├── paymentService.js # Stripe/PayPal integration
│   │   ├── deliveryDays.js   # Delivery date calculation
│   │   ├── cartService.js    # Cart management
│   │   └── send-email.js     # Email notifications
│   │
│   ├── 📁 utils/           # Helpers & utilities
│   │   ├── jwtUtils.js     # Token generation/verification
│   │   └── email-template.js   # Email templates
│   │
│   └── 📁 tests/           # Unit/integration tests
│       ├── auth.test.js
│       └── product.test.js
│
├── 📄 app.js               # Main Express app setup
├── 📄 .env                 # Environment variables
└── 📄 package.json



Client (Frontend)
   ↓
API Gateway / Load Balancer (NGINX, AWS API Gateway)
   ↓
Backend (App Server)
   ├── Controllers (Route Handlers)
   ├── Services (Business Logic)
   ├── Repositories (Data Access Layer)
   └── Models (DB Schemas)
   ↓
Database (PostgreSQL / MongoDB)


3. Database Schema (Relational)
Users (id, name, email, password_hash, role, created_at)

Products (id, title, description, price, stock, category_id)

Categories (id, name, parent_id)

CartItems (id, user_id, product_id, quantity)

Orders (id, user_id, status, total_price, created_at)

OrderItems (id, order_id, product_id, quantity, price)

Payments (id, order_id, status, payment_method, payment_reference)

ShippingInfo (id, order_id, address, delivery_date, status)