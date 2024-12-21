import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import employeeRoutes from './routes/employee.routes';

async function main() {
  const app: Express = express();
  // await runSeed();
  app.use(cors());
  app.use(express.json());
  app.use('/api', employeeRoutes);
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:4000`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
