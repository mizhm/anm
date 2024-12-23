import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const employees = mysqlTable('employees', {
  id: int('id').primaryKey().autoincrement(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  position: text('position').notNull(),
  department: text('department').notNull(),
  gender: text('gender').notNull(),
  experienceYears: text('experience_years').notNull(),
  joinYear: text('join_year').notNull(),
  salary: text('salary').notNull(),
  idNumber: text('id_number').notNull(),
  address: text('address').notNull(),
  dateOfBirth: text('date_of_birth').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export type Employee = InferSelectModel<typeof employees>;
export type NewEmployee = InferInsertModel<typeof employees>;
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
