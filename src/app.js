import express from 'express';
import userArtistRoutes from './routes/userArtistRoutes.js';
import userBusinessRoutes from './routes/userBussinessRoutes.js';
import loginRoutes from './routes/loginRoutes.js'


const app = express();

// middlewares
app.use(express.json());

app.use(userArtistRoutes);
app.use(userBusinessRoutes);
app.use(loginRoutes);


export default app;