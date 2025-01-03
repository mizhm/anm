import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';

const employeeService = new EmployeeService();

export const employeeController = {
  async getAll(req: Request, res: Response) {
    try {
      const employees = await employeeService.findAll();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees' + error });
    }
  },

  async getOne(req: Request, res: Response): Promise<any> {
    try {
      const employee = await employeeService.findById(parseInt(req.params.id));
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.json(employee);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch employee' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const result = await employeeService.create(req.body);

      if (result.errors) {
        res.status(400).json({
          errors: result.errors,
          message: 'Validation failed',
        });
      } else {
        res.status(201).json({
          returnId: result.id,
          message: 'Employee created successfully',
        });
      }
    } catch (error) {
      res.status(500).json({
        errors: [{ message: 'Failed to create employee' }],
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await employeeService.update(
        parseInt(req.params.id),
        req.body,
      );
      if (result.errors) {
        res.status(400).json({
          errors: result.errors,
          message: 'Validation failed',
        });
      } else {
        res.status(201).json({ message: 'Employee updated successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update employee' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await employeeService.delete(parseInt(req.params.id));
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  },
};
