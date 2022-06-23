import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';

//routes
const app= express();

//middleware
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

dotenv.config()

//connecting the mongoDb database
mongoose.connect(
 process.env.MONGODB_URI,
  {useNewUrlParser:true, useUnifiedTopology: true}
).then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening to the Port ${process.env.PORT}`)))
.catch( (err)=>console.log(err));

//uses of routes
app.use('/auth',AuthRoute);

