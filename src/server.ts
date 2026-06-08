import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import routes from './routes';
import clubRoutes from './routes/clubRoutes'; // by sailesh routing to the server
import authRoutes from './routes/authRoutes'; // by sailesh routing to the server
import uploadRoutes from './routes/uploadRoutes';
import galleryRoutes from './routes/galleryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/clubs', clubRoutes); // Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../swagger.json'), 'utf8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// All routes are aggregated in src/routes/index.ts
app.use('/', routes);

// -------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
