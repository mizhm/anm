import { eq } from 'drizzle-orm';
import { db } from '../db';
import { Employee, employees, NewEmployee } from '../db/schema';
import { decrypt, encrypt } from '../utils/encryption';

export class EmployeeService {
  async findAll(): Promise<Employee[]> {
    let result = await db.select().from(employees);
    result = result.map((employee) => ({
      ...employee,
      salary: employee.salary ? decrypt(employee.salary) : null,
      idNumber: employee.idNumber ? decrypt(employee.idNumber) : null,
    }));
    return result;
  }

  async findById(id: number): Promise<Employee | null> {
    const result = await db
      .select()
      .from(employees)
      .where(eq(employees.id, id));
    return result[0] || null;
  }

  async create(data: NewEmployee): Promise<void> {
    const encryptedData = {
      ...data,
      salary: data.salary ? encrypt(data.salary) : undefined,
      idNumber: data.idNumber ? encrypt(data.idNumber) : undefined,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    };

    await db.insert(employees).values(encryptedData);
  }

  async update(id: number, data: Partial<NewEmployee>): Promise<void> {
    const encryptedData = {
      ...data,
      salary: data.salary ? encrypt(data.salary) : undefined,
      idNumber: data.idNumber ? encrypt(data.idNumber) : undefined,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    };

    await db.update(employees).set(encryptedData).where(eq(employees.id, id));
  }

  async delete(id: number): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }
}
