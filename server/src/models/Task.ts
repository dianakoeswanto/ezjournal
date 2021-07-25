import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson"
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class"
  },
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Task = model('Task', taskSchema);

export default Task;
