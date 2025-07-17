import {generateOrderConfirmationEmail,generateOrderDeliveredEmail, generateWelcomeEmail} from '../utils/email-template.js';
import { transporter } from '../config/nodemailer.js';
import { GMAIL_USER } from '../config/env.js';


export const takedOrdersEmail =  async ({to, order,customerName}) => {

    if (!to ) throw  Error("Missing information..");


    const mailInfo = {
        customerName : customerName,
        orderId : order.id,
        items : order.items,
        totalPrice : order.totalAmount,
        estimatedDelivery : order.estimatedDelivery,

    };

    const htmlFile = generateOrderConfirmationEmail(mailInfo);

    try {
    transporter.sendMail({
        from : GMAIL_USER,
        to: to,
        subject :`Order Confirmation #${order.id}`,
        html : htmlFile
    });

    console.log("Order placed and email sent")
} catch(err){
    console.error("error sending confirmation email")
}

}

export const orderdelivred = ({to, order,customerName}) => {

    if (!to) throw  Error("Missing information..");

    const mailInfo = {
        customerName : customerName,
        orderId : order.id,
        deliveryDate: order.deliveryDate, 
        items: order.items 
    }

    const htmlFile = generateOrderDeliveredEmail(mailInfo)
    try {
        transporter.sendMail({
            from : GMAIL_USER,
            to: to,
            subject: `Order #${order.id} has been delivered. Hope to see you again`,
            html: htmlFile
        });
        console.log("Order delivered email sent.")
    }   catch(err){
    console.error("error sending delivered email")
    }
    
}


export const WelcomeEmail = ({to,customerName}) => {

    if (!to) throw  Error("Missing information..");

    const htmlFile = generateWelcomeEmail(customerName)
    try {
        transporter.sendMail({
            from: GMAIL_USER,
            to: to,
            subject : "Welcome 🎉",
            html: htmlFile
        });
        console.log("New User Welcome email sent")
    }catch(err){
    console.error("error sending welcome email")
}

}