import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';


dotenv.config();
const PORT = process.env.PORT || 5500;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: CLIENT_ORIGIN, 
  credentials:true
}))
// Set a larger limit for request body
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the size as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // For form data


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});