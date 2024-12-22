import { faker } from '@faker-js/faker';
import { encrypt } from '../utils/encryption';
import { db } from './index';
import { employees, users } from './schema';
import * as argon2 from 'argon2';

export async function runSeed() {
  const employeeData = Array.from({ length: 20 }, () => ({
    fullName: faker.person.fullName(),
    position: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' }),
    department: faker.commerce.department(),
    address: faker.location.streetAddress(),
    salary: encrypt(
      faker.number.int({ min: 5000000, max: 50000000 }).toString(),
    ),
    idNumber: encrypt(faker.string.uuid()),
    dateOfBirth: new Date(
      faker.date.between({ from: '1950-01-01', to: '2000-01-01' }),
    ),
  }));
  await db.delete(employees);
  await db.insert(employees).values(employeeData);

  const userData = [
    {
      username: 'admin',
      password: await argon2.hash('123456'),
    },
    {
      username: 'user',
      password: await argon2.hash('123456'),
    },
  ];
  await db.insert(users).values(userData);
  console.log('Seeding completed.');
}
