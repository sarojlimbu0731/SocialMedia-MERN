import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import cors from 'cors'

//routes
const app= express();


//middleware
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

dotenv.config()

//connecting the mongoDb database
mongoose.connect(
 process.env.MONGODB_URI,
  {useNewUrlParser:true, useUnifiedTopology: true}
).then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening to the Port ${process.env.PORT}`)))
.catch( (err)=>console.log(err));

//uses of routes
//for login and registering
app.use('/auth',AuthRoute);

//for user CRUD operation
app.use('/user',UserRoute)

//for post operation
app.use('/post',PostRoute)

