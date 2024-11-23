import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/database';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

dotenv.config();

const app = express();
app.use(bodyParser.json());

connectDB();

// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to the Product API!');
// });

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', productRoutes);

app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
