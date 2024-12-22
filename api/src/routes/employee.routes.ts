import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/employees', authMiddleware, employeeController.getAll);
router.get('/employees/:id', authMiddleware, employeeController.getOne);
router.post('/employees', authMiddleware, employeeController.create);
router.put('/employees/:id', authMiddleware, employeeController.update);
router.delete('/employees/:id', authMiddleware, employeeController.delete);

export default router;
