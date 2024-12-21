import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  date,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const employees = mysqlTable('employees', {
  id: int('id').primaryKey().autoincrement(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  position: varchar('position', { length: 100 }),
  department: varchar('department', { length: 100 }),
  salary: text('salary_encrypted'),
  idNumber: text('id_number_encrypted'),
  address: text('address'),
  dateOfBirth: date('date_of_birth'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export type Employee = InferSelectModel<typeof employees>;
export type NewEmployee = InferInsertModel<typeof employees>;
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
