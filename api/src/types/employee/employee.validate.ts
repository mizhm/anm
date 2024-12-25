import { z } from 'zod';
import { db } from '../../db';
import { employees } from '../../db/schema';
import { decrypt } from '../../utils/encryption';

const checkUniqueEmail = async (email: string, id?: number) => {
  const emailsInDB = await db
    .select({ id: employees.id, email: employees.email })
    .from(employees);
  return !emailsInDB.some((e) => decrypt(e.email) === email && e.id !== id);
};

const currentYear = new Date().getFullYear();

export const employeeValidateSchema = z
  .object({
    id: z.number().optional(),
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    phone: z.string().regex(/^[0-9]{10,11}$/, 'Phone must be 10-11 digits'),
    position: z.string().min(2, 'Position is required'),
    department: z.string().min(2, 'Department is required'),
    gender: z.coerce.boolean(),
    experienceYears: z.number().min(0, 'Experience years must be at least 0'),
    joinYear: z
      .string()
      .transform((str) => new Date(str))
      .refine(
        (date) =>
          date.getFullYear() >= 1900 && date.getFullYear() <= currentYear,
        {
          message: `Join year must be between 1900 and ${currentYear}`,
        },
      ),
    salary: z.number().min(0, 'Salary must be at least 0'),
    idNumber: z.string().min(9, 'ID number must be at least 9 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    dateOfBirth: z
      .string()
      .transform((str) => new Date(str))
      .refine(
        (date) => {
          const year = date.getFullYear();
          return year >= 1900 && year <= currentYear - 18;
        },
        {
          message: 'Employee must be at least 18 years old and born after 1900',
        },
      ),
  })
  .refine(async ({ email, id }) => await checkUniqueEmail(email, id), {
    message: 'Email already exists',
    path: ['email'],
  });
