import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const PORT = process.env.PORT || 5500;

app.use('/api/auth', authRoutes);

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});