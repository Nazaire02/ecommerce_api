import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from "helmet";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8081;

//routes import
import userRoutes from './routes/userRoutes.js';

//database connection
if (process.env.NODE_ENV === 'prod') {
    //mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gtpav.mongodb.net/`, { dbName: 'jaed-billeterie-bd' });
}
else {
    mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
}

// On Connection
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('alert', () => console.log('alert'));
mongoose.connection.on('error', () => console.log('error'));


const corsOptions = {
    origin: '*',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    //allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

//Routes declarations
const baseAPI = '/api'
app.use(`${baseAPI}/users`, userRoutes)

app.listen(port, () => {
    console.log(`Express started on port ${port}`)
})