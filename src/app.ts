import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { codeError } from './middleware/codeError';

const curr = process.env.NODE_ENV;

const app: Express = express();

app.use(
  cors({
    origin: curr === 'Development' ?  'http://localhost:5173' : 'https://movienotepadclient.onrender.com/*' ,
    credentials: true,
  })
);

app.use(morgan('dev'))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({limit:'10000000'}));

app.use('/', router());

app.use('*', codeError, (req:Request, res:Response)=>{
  return res.status(404).json({message:'404 Not Found'})
})

export default app;
