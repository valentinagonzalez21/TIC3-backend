import express from 'express';
import artistRoutes from './routes/artistRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import loginRoutes from './routes/loginRoutes.js'
import eventRoutes from './routes/loginRoutes.js'
import cors from 'cors'



const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use(artistRoutes);
app.use(businessRoutes);
app.use(loginRoutes);
app.use(eventRoutes)


export default app;