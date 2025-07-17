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







