import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import notesRouter from './routes/noteRoutes';
import express, { Request, Response } from 'express';

dotenv.config();

const PORT = Number(process.env.PORT) || 8000;
const MONGO_URI = process.env.MONGO_URI as string;
export const API_KEY = process.env.API_KEY as string;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({"hello": "world"})
});

mongoose.connect(MONGO_URI as string, {})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

app.use("/api", notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
