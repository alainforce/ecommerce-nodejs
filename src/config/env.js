import {config} from "dotenv";

config(".env");

export const {
    JWT_SECRET, 
    JWT_EXPIRATION ,PORT,DB_URI,GMAIL_USER,GMAIL_PASSWORD, IYZIPAY_API_KEY, IYZIPAY_SECRET, IYZIPAY_BASE_URL} = process.env;