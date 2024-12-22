import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { User, users } from '../db/schema';

export class UserService {
  async login(username: string, password: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    console.log(username, password);
    if (await argon2.verify(result[0].password, password)) {
      return result[0] || null;
    }
    return null;
  }
}
