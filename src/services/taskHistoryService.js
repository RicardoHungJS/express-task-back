import TaskHistory from '../models/taskHistorySchema.js';

/**
 * Creates a task history entry.
 *
 * @param {string} taskId - The ID of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {Object} task - The task object containing updated fields.
 * @returns {Promise<void>} - A promise that resolves when the task history is saved.
 */
export const createTaskHistory = async (taskId, title, description, task) => {
  const taskHistory = new TaskHistory();
  const updatedFields = Object.keys(task);

  if (updatedFields.length > 0) {
    taskHistory.taskId = taskId;
    taskHistory.title = title;
    taskHistory.description = `${description}, fields: ${updatedFields.join(
      ', '
    )}`;
  }

  try {
    await taskHistory.save();
    console.log('Task history saved successfully');
  } catch (error) {
    console.error('Error saving task history:', error);
  }
};

/**
 * Retrieves all tasks from the TaskHistory collection based on the provided filters.
 *
 * @param {Object} filters - The filters to apply when querying the TaskHistory collection.
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 * @throws {Boom.Boom} Throws a Boom error if no tasks are found or if there is a server error.
 */
export const getAllTasks = async (filters) => {
  try {
    const tasks = await TaskHistory.find(filters).sort({ modificationDate: 1 });

    if (tasks.length === 0) {
      throw Boom.notFound('No tasks found');
    }

    return tasks;
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 500 });
  }
};
