import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import connectDB from './lib/db.js';

dotenv.config();
const PORT = process.env.PORT || 5500;

const app = express();
app.use('/api/auth', authRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});