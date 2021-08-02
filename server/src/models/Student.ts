import { Schema, model, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  _id: string
  firstname: string;
  lastname: string;
  parent: Types.ObjectId;
  classes: [Types.ObjectId];
}

const studentSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  parent: {
      type: Types.ObjectId,
      ref: "User"
  },
  classes: [
    {
      type: Types.ObjectId,
      ref: "Class"
    }
  ]
});


export default model<IStudent>('Student', studentSchema);
