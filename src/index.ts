import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './api/users/routes';
import alertRoutes from './api/alerts/routes';
import { startPriceChecker } from './jobs/priceChecker';
import { swaggerUiHandler, swaggerDocHandler } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/docs', swaggerUiHandler, swaggerDocHandler);
app.get('/docs/test', (req, res) => {
  res.send('Swagger route test OK');
});

app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);

app.get('/', (_req, res) => {
  res.send('🚀 Crypto Price Alert Service API');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  startPriceChecker();
});

export default app;
