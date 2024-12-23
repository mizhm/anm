import { eq } from 'drizzle-orm';
import { db } from '../db';
import { Employee, employees, NewEmployee } from '../db/schema';
import {
  decryptFieldInObject,
  encryptFieldInObject,
} from '../utils/encryption';

//TODO: fix service for adapting new field in db
export class EmployeeService {
  async findAll(): Promise<Employee[]> {
    let result = await db.select().from(employees);
    result = result.map((employee) => decryptFieldInObject(employee));
    return result;
  }

  async findById(id: number): Promise<Employee | null> {
    const result = await db
      .select()
      .from(employees)
      .where(eq(employees.id, id));
    return decryptFieldInObject(result[0]) || null;
  }

  async create(data: NewEmployee): Promise<void> {
    await db.insert(employees).values(encryptFieldInObject(data));
  }

  async update(id: number, data: Partial<NewEmployee>): Promise<void> {
    await db
      .update(employees)
      .set(encryptFieldInObject(data))
      .where(eq(employees.id, id));
  }

  async delete(id: number): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }
}
