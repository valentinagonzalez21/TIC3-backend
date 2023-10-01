import express from 'express';
import userArtistRoutes from './routes/userArtistRoutes.js';
import userBusinessRoutes from './routes/userBussinessRoutes.js';


const app = express();

// middlewares
app.use(express.json());

app.use(userArtistRoutes);
app.use(userBusinessRoutes);

export default app;