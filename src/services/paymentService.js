import Iyzipay  from "iyzipay";
import { iyzipay } from "../config/iyzipay.js";
import Payment from "../models/paymentModel.js"


export const payment = (req,res) => {
 try {
  const { price, paidPrice, basketId, paymentCard, buyer, shippingAddress, billingAddress, basketItems} = req.body

  const conversationId = `${basketId}_${Date.now()}`;

 const paymentRequest = {
  locale:  Iyzipay.LOCALE.TR,
  conversationId: conversationId,
  price: price,              
  paidPrice: paidPrice,      
  currency: Iyzipay.CURRENCY.TRY,
  installment: '1',          // Set '1' if you don’t support installment options
  basketId: basketId,
  paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,     
  paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,

  paymentCard: {
    cardHolderName: paymentCard.cardHolderName,
    cardNumber: paymentCard.cardNumber,
    expireMonth: paymentCard.expireMonth,
    expireYear: paymentCard.expireYear,
    cvc: paymentCard.cvc,
    registerCard: '1' // set '1' if you want to store card for later use '0' if not
  },

  buyer: {
    id: req.user.id,
    name: req.user.firstName, // firstName
    surname: req.user.lastName,//lastName
    gsmNumber: buyer.gsmNumber,
    email: req.user.email,
    identityNumber: buyer.identityNumber, // we will add more variable in User Model then we can use req.user.identityNumber,...
    lastLoginDate: buyer.lastLoginDate ,
    registrationDate: buyer.registrationDate,
    registrationAddress: buyer.registrationAddress,
    ip: buyer.ip || req.ip,
    city: buyer.city,
    country: buyer.country,
    zipCode: buyer.zipCode
  },

  shippingAddress: {
    contactName: shippingAddress.contactName,
    city: shippingAddress.city,
    country: shippingAddress.country,
    address: shippingAddress.address,
    zipCode: shippingAddress.zipCode
  },

  billingAddress: {
    contactName: billingAddress.contactName,
    city: billingAddress.city,
    country: billingAddress.country,
    address: billingAddress.address,
    zipCode: billingAddress.zipCode
  },

  basketItems: basketItems.map(item => ({
    id: item.id,
    name: item.name,
    category1: item.category1,
    category2: item.category2 || '',
    itemType: item.itemType, // 'PHYSICAL' or 'VIRTUAL'
    price: item.price
  }))
};

 

  iyzipay.payment.create(paymentRequest, async (err, result) => {
      if (err) return res.status(500).json({ status: "failed", error: err });

      await Payment.create({
        userId: req.user.id,
        orderId: basketId,
        amount: result.paidPrice,
        status: 'success',
        iyzipayPaymentId: result.paymentId,
        iyzipayConversationId: conversationId,
        iyzipayRawResponse: result
    });

        res.json(result);
    });


  } catch(err){
    res.status(500).send("internal server error");
  }

}
export const getAllPayments = async (req, res) => {

    try {
    const allPayment = await Payment.find()
    res.status(200).json(allPayment)
    } catch(err){
        res.status(500).send({message:"internal server error "})
    }

}

