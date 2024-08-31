import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    phone_no: { type: String },
    age: { type: Number },
    profilePic: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);
