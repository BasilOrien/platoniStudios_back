import { config } from "dotenv";
import session from "express-session";

config()

export default function configureSession() {
    return session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SECRET
    })
}