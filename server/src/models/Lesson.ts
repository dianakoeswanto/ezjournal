import { Schema, model } from 'mongoose';

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
    type: Schema.Types.ObjectId,
    ref: "Class"
  }
});

const Lesson = model('Lesson', lessonSchema);

export default Lesson;
