import  { Router } from "express";
import { payment, getAllPayments } from "../services/paymentService.js";
import { authorize } from "../middlewares/authMiddleware.js";
import adminMiddleware from '../middlewares/adminMiddleware.js';


const paymentRouter = Router();

paymentRouter.post("/", authorize, payment);
paymentRouter.get('/', adminMiddleware, getAllPayments );


export default paymentRouter;




