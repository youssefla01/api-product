import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Product API!');
});

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
