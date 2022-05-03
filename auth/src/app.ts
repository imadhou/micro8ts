import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { sendError } from './helpers/errorHandler';
import { authRouter } from './routes/authRouter';
const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !=='dev'
}))
app.use("/api/users/",authRouter);

app.use(sendError);

export { app };