import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  phone_no: { type: String },
  age: { type: Number },
  address: { type: String },
});
