import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';

const router = Router();

router.get('/employees', employeeController.getAll);
router.get('/employees/:id', employeeController.getOne);
router.post('/employees', employeeController.create);
router.put('/employees/:id', employeeController.update);
router.delete('/employees/:id', employeeController.delete);

export default router;
