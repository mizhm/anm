import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { generateToken } from '../utils/jwt';

const userService = new UserService();

export const userController = {
  async login(req: Request, res: Response): Promise<any> {
    const { username, password } = req.body;
    const user = await userService.login(username, password);
    if (user) {
      const token = generateToken({ id: user.id, username: user.username });
      return res.json({ token });
    }
    res.status(401).json({ error: 'Unauthorized' });
  },
};
