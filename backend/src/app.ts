import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3000;
const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object


app.get('/', (req: Request, res:Response) => {
  res.send('let s init ');
});


app.listen(port, ()=>console.log('listening on port 3000'))
