import express from 'express';


import {PORT} from './config/env.js';
import connectDB from './config/db.js';
import  authRouter  from './routes/authRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

import errorHandler from './middlewares/errorHandle.js';


const port = PORT || 5000;
const app = express();


app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', cartRouter )
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter); 
app.use('/api/v1/payment', paymentRouter)

app.use(errorHandler)


app.get('/api/v1', (req, res) => {
    res.send('API is running...');
});

app.listen(port, async  () => {  
    console.log(`Server is running on http://localhost:${port}`);

    // Connect to the database
    await connectDB()

});



