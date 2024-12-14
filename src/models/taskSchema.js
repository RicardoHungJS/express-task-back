import mongoose from 'mongoose';

const priorityArray = ['Low', 'Medium', 'High'];
const statusArray = ['Pending', 'In Progress', 'Completed'];

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: statusArray,
    required: [true, 'Please select the status'],
  },
  priority: {
    type: String,
    enum: priorityArray,
    default: 'Medium',
  },
  dueDate: {
    type: Date,
    required: [true, 'Please enter the due date'],
    validate: {
      validator: (value) => {
        return value >= new Date();
      },
      message: 'Due date cannot be in the past',
    },
  },
  tags: {
    type: [String],
    validate: {
      validator: (value) => {
        return Array.isArray(value) && new Set(value).size === value.length;
      },
      message: 'Tags must be unique',
    },
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
