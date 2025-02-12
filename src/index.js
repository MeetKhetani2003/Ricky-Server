import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { dbConnect } from './configs/dbConfig.js';
import { PORT } from './configs/variablesConf.js';
import apiRouter from './routers/apiRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/api', apiRouter);

dbConnect().then(
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);
