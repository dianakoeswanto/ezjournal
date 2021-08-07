import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  }
});

export default model<IUser>('User', userSchema);
