import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}


const app = express();
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})