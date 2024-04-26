import express, {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import user from "./routes/user";
import db  from "./config/database.config";
const Port = process.env.PORT || 3000;
const app = express()

app.use(cors());
db.sync()
  .then(() => {
    console.log('Database conneted successfully');
  })
  .catch((err: Error) => {
    console.log('Error connecting to database')
    console.log(err);
  });
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/', user);

app.use(function (req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});


export default app;