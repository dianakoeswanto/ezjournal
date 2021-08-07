import { Schema, model, Types, Document } from 'mongoose';

export interface ILesson extends Document {
  time: Date,
  positiveComments: String,
  additionalComments?: String
  class: Types.ObjectId,
  improvements: [String]
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
  },
  class: {
    type: Types.ObjectId,
    ref: "Class"
  },
  improvements: [
    {
      type: String,
      required: true,
    }
  ]
});

const Lesson = model<ILesson>('Lesson', lessonSchema);

export default Lesson;
