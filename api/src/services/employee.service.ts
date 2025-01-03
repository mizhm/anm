import { desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { Employee, employees, NewEmployee } from '../db/schema';
import { employeeValidateSchema } from '../types/employee/employee.validate';
import { ValidateError } from '../types/error';
import {
  decryptFieldInObject,
  encryptFieldInObject,
} from '../utils/encryption';

//TODO: fix service for adapting new field in db
export class EmployeeService {
  async findAll(): Promise<Employee[]> {
    let result = await db.select().from(employees).orderBy(desc(employees.id));
    result = result.map((employee) => decryptFieldInObject(employee));
    // console.log(result);
    return result;
  }

  async findById(id: number): Promise<Employee | null> {
    const result = await db
      .select()
      .from(employees)
      .where(eq(employees.id, id));
    return decryptFieldInObject(result[0]) || null;
  }

  async create(
    data: NewEmployee,
  ): Promise<{ id?: number; errors?: ValidateError[] }> {
    try {
      const validation = await employeeValidateSchema.safeParseAsync(data);

      if (!validation.success) {
        return {
          errors: Object.entries(validation.error.flatten().fieldErrors).map(
            ([field, messages]) => ({
              field,
              message: Array.isArray(messages) ? messages[0] : messages,
            }),
          ),
        };
      }

      const returnId = await db
        .insert(employees)
        .values(encryptFieldInObject(validation.data))
        .$returningId();
      return { id: returnId[0].id };
    } catch (error) {
      return {
        errors: [{ message: 'Failed to create employee' }],
      };
    }
  }

  async update(
    id: number,
    data: Partial<Employee>,
  ): Promise<{ errors?: ValidateError[] }> {
    const validation = await employeeValidateSchema.safeParseAsync(data);
    if (!validation.success) {
      return {
        errors: Object.entries(validation.error.flatten().fieldErrors).map(
          ([field, messages]) => ({
            field,
            message: Array.isArray(messages) ? messages[0] : messages,
          }),
        ),
      };
    }
    try {
      await db
        .update(employees)
        .set(encryptFieldInObject(data))
        .where(eq(employees.id, id));
      return {};
    } catch (error) {
      return {
        errors: [{ message: 'Failed to update employee' }],
      };
    }
  }

  async delete(id: number): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }
}
