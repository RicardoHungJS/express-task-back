import mongoose from 'mongoose';

const taskHistorySchema = new mongoose.Schema({
  modificationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TaskHistory = mongoose.model('taskHistory', taskHistorySchema);

export default TaskHistory;
