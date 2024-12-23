import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import { encryptFieldInObject } from '../utils/encryption';
import { db } from './index';
import { employees, users } from './schema';

export async function runSeed() {
  const employeeData = Array.from({ length: 20 }, () => {
    const dateOfBirth = faker.date.between({
      from: '1970-01-01',
      to: '2000-01-01',
    });
    const experienceYears = faker.number.int({ min: 0, max: 30 });
    const joinYear = faker.number.int({
      min: 2000,
      max: new Date().getFullYear(),
    });
    return {
      fullName: faker.person.fullName(),
      position: faker.person.jobTitle(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'national' }),
      department: faker.commerce.department(),
      address: faker.location.streetAddress(),
      salary: faker.number.int({ min: 5000000, max: 50000000 }).toString(),
      idNumber: faker.string.uuid(),
      gender: faker.datatype.boolean(),
      experienceYears,
      joinYear,
      dateOfBirth,
    };
  });
  await db.delete(employees);
  const encrypted = employeeData.map((employee) =>
    encryptFieldInObject(employee),
  );
  await db.insert(employees).values(encrypted);

  const userData = [
    {
      username: 'admin',
      password: await argon2.hash('123456'),
      fullName: 'Admin',
    },
    {
      username: 'user',
      password: await argon2.hash('123456'),
      fullName: 'User',
    },
  ];
  await db.insert(users).values(userData);
  console.log('Seeding completed.');
}
