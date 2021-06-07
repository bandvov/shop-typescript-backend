import { Response, Request } from 'express';
import sha256 from 'sha256';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../types/user';

dotenv.config();

const { SALT, JWT_SALT, JWT_EXPIRES_IN } = process.env;

export const getAllUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await User.find({}, '-password');
  res.status(200).json({ users });
};
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: IUser | null = await User.findById(id);

  res.setHeader('Content-Type', 'application/json');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ user });
};
export const register = async (req: Request, res: Response) => {
  const {
    firstName, lastName, email, password,
  } = req.body as Pick<
    IUser,
    'firstName' | 'lastName' | 'email' | 'password'
  >;

  res.setHeader('Content-Type', 'application/json');

  const userExists: IUser | null = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exist' });
  }
  const user: IUser = await new User({
    firstName,
    lastName,
    email,
    password: sha256(password + SALT),
  }).save();

  return res
    .status(201)
    .json({ message: 'User successfully registered', id: user._id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as Pick<IUser, 'email' | 'password'>;

  res.setHeader('Content-Type', 'application/json');

  const user: IUser | null = await User.findOne({
    email,
    password: sha256(password + SALT),
  });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const token: string = jwt.sign({ email: user.email }, JWT_SALT, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.cookie('access-token', token, {
    expires: new Date(Date.now() + 24 * 3600000),
    secure: true,
    signed: true,
    httpOnly: true,
  }); // cookie will be removed after 24 hours
  return res.status(200).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
      email: user.email,
    },
    message: 'Successfully logged in',
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    avatar,
    active,
    address,
    phoneNumber,
  } = req.body as Pick<
    IUser,
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'phoneNumber'
    | 'address'
    | 'avatar'
    | 'active'
  >;

  res.setHeader('Content-Type', 'application/json');

  const userExists: IUser | null = await User.findById(id);

  if (!userExists) {
    return res.status(404).json({ message: 'User not found' });
  }

  const user: IUser | null = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        firstName,
        lastName,
        email,
        password: sha256(password + SALT),
        avatar,
        active,
        address,
        phoneNumber,
      },
    },
    { new: true },
  );

  if (user) {
    user.password = undefined;
    return res
      .status(200)
      .json({ message: 'User data successfully updated', user });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.setHeader('Content-Type', 'application/json');

  const user: IUser | null = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ message: 'User successfully deleted' });
};
