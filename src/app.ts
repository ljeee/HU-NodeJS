import 'dotenv/config';
import express from 'express';
import { initModels } from './models/init-models.js';
import cors from 'cors';
import { connectDB, sequelize } from './config/dbconect.js';
import { router as authRouter } from './routes/auth.routes.js';
import { router as productsRouter } from './routes/products.routes.js';
import { router as customersRouter } from './routes/customers.routes.js';
import { router as ordersRouter } from './routes/orders.routes.js';
import { roleAuth } from './middleware/roleAuth.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

initModels(sequelize);

app.use(authRouter);
app.use('/products', roleAuth(['admin', 'vendedor']), productsRouter);
app.use('/customers', roleAuth(['admin', 'vendedor']), customersRouter);
app.use('/orders', roleAuth(['admin', 'vendedor']), ordersRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
