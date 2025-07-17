import nodemailer from "nodemailer"
import {GMAIL_PASSWORD,GMAIL_USER} from "./env.js"

export const transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user: GMAIL_USER,
        pass : GMAIL_PASSWORD
    }
})