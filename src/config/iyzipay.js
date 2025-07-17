import Iyzipay from "iyzipay";

import {IYZIPAY_BASE_URL, IYZIPAY_SECRET, IYZIPAY_API_KEY} from "./env.js"


export const iyzipay = new Iyzipay({
  apiKey: IYZIPAY_API_KEY,
  secretKey: IYZIPAY_SECRET,
  uri: IYZIPAY_BASE_URL
});

