import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    email: string,
    name: string,
    isParent: boolean
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  isParent: {
    type: Boolean,
    default: false
  }
});

export default model<IUser>('User', userSchema);
