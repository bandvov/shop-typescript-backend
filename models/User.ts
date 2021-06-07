import { model, Schema } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: 'firstName is required',
    },

    lastName: {
      type: String,
      required: 'lastName is required',
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
    },

    password: {
      type: String,
      required: 'Password is required',
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
      },
    ],

    confirmed: Boolean,
    avatar: String,
    active: { type: Boolean, default: true },
  },

  { timestamps: true },
);

export default model<IUser>('Users', userSchema, 'Users');
