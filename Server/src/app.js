import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDatabase } from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoute.js'
const app=express();
dotenv.config();
connectDatabase();
app.use(express.json());
app.use(cors({
    origin: "https://trifolix-hair-transplant-3ede.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
    credentials: true 
}));

app.use(session({
    secret: 'trifolix',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } 
  }));



app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/user',userRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
