import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from "express-mongo-sanitize"
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import connectDB from "./config/db";
import router from "./routes";
import ErrorMiddleware from "./middlewares/error";

// configure .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//Connect DB
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Enable Cors
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

app.use('/api', router);

app.use(ErrorMiddleware.notFound)

export { app };