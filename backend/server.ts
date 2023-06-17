import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/users", userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})