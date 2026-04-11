import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'API is running',
  });
});

app.use('/api/health', healthRoutes);

export default app;