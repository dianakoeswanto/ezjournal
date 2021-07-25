import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    email: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

export default model<IUser>('User', userSchema);
