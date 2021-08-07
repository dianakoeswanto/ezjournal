import { Schema, model, Types } from 'mongoose';

export interface ILesson {
  time: Date,
  positiveComments: String,
  additionalComments: String
  class: Types.ObjectId,
  improvements: [Types.ObjectId]
}

const lessonSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  positiveComments: {
      type: String,
      required: true,
  },
  additionalComments: {
      type: String,
      required: true,
  },
  class: {
    type: Types.ObjectId,
    ref: "Class"
  },
  improvements: [
    {
      type: Types.ObjectId,
      ref: "Task"
    }
  ]
});

const Lesson = model<ILesson>('Lesson', lessonSchema);

export default Lesson;
