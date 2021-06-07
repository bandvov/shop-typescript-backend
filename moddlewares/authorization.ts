import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import User from '../models/User';

export const auth = async (req: Request, res: Response, next: Function) => {
  try {
    if (!req.signedCookies) throw new Error('Forbidden');
    const token = req.signedCookies;
    const { email } = jwt.verify(token, process.env.SALT);
    const userExist = await User.findOne({ email });

    if (!userExist) throw new Error('Forbidden');

    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
