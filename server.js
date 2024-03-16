import express from "express";
import apiRoute from "./src/routes/api.js";
import mongoose from "mongoose";
import { DB_CONNECT } from "./src/utils/constants.js";
import  cors from 'cors';

const PORT = process.env.PORT || 5000
const app = express();

mongoose.connect(DB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors())
app.use(express.json())
app.use((req,res,next) => {
    console.log("HTTpl Method: " + req.method + " " + req.url)
    next();
  })
  app.use(express.urlencoded({
    extended: true
  }));
  
app.use('/users',apiRoute);

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})

