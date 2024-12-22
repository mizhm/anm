import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import authRoutes from './routes/auth.routes';
import employeeRoutes from './routes/employee.routes';

async function main() {
  const app: Express = express();
  // await runSeed();
  app.use(cors());
  app.use(express.json());

  app.use('/api', employeeRoutes);
  app.use('/api', authRoutes);

  app.listen(process.env.PORT || 4000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:4000`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
