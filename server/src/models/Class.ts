import { Schema, Document, model, Types } from 'mongoose';

export interface IClass extends Document {
    className: string;
    classTime: Date;
    student: Types.ObjectId;
    teacher: Types.ObjectId;
}

const classSchema: Schema = new Schema({
  className: {
    type: String,
    required: true,
  },
  classDay: {
    type: String,
    required: true,
},
  classTime: {
      type: String,
      required: true,
  },
  student: {
      type: Schema.Types.ObjectId,
      ref: "Student"
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User"
} 
});

export default model<IClass>('Class', classSchema);;
