import express, { Express, Request, Response, Application } from 'express';
import 'dotenv/config'

import customers from './routes/customers';
import chambers from './routes/chambers';


const app: Application = express() as Express;
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/customers', customers);
app.use('/chambers', chambers);

app.listen(port, () => {
  console.log(`Server is available at http://localhost:${port}`);
});