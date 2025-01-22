import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const PORT = process.env.PORT || 5500;

app.use('/api/auth', authRoutes);

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});