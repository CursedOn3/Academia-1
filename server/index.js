import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//APIs
app.use('/api/v1/user', userRoute);

"http://localhost:5000/api/v1/user/register"

app.listen (port, () => {
  console.log(`Server is running on port ${port}`);
});