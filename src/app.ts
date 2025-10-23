import 'dotenv/config';
import express from 'express';
import { initModels } from './models/init-models.js';
import cors from 'cors';
import { connectDB, sequelize } from './config/dbconect.js';

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

initModels(sequelize);

import { router as authRouter } from './routes/auth.routes.js';
app.use(authRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
