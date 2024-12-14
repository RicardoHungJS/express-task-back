import Boom from '@hapi/boom';
import * as taskService from '../services/taskService.js';

/**
 * Retrieves tasks from the database based on query parameters.
 *
 * This function supports filtering tasks by the following criteria:
 * - **status**: Filters tasks by their status (e.g., "pending", "completed").
 * - **priority**: Filters tasks by their priority level (e.g., "high", "low").
 * - **tags**: Filters tasks that match all specified tags. Tags should be provided as a comma-separated string.
 * - **startDate**: Filters tasks with a due date on or after this date (format: YYYY-MM-DD).
 * - **endDate**: Filters tasks with a due date on or before this date (format: YYYY-MM-DD).
 *
 * If no filters are provided, all tasks are retrieved.
 *
 * @param {Object} req - The HTTP request object containing query parameters.
 * @param {Object} res - The HTTP response object used to send the result or error.
 * @returns {void}
 *
 * @throws {Boom} If an error occurs during task retrieval, it responds with a 500 status code and a descriptive error payload.
 */
export const getTasks = async (req, res) => {
  try {
    const { status, priority, tags, startDate, endDate } = req.query;
    const filters = {};

    //adding filters to the query
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (tags) filters.tags = { $all: tags.split(',') };
    if (startDate || endDate) {
      filters.dueDate = {};
      if (startDate) filters.dueDate.$gte = new Date(startDate);
      if (endDate) filters.dueDate.$lte = new Date(endDate);
    }

    const tasks = await taskService.getAllTasks(filters);
    res.status(200).json(tasks);
  } catch (error) {
    const boomError = Boom.boomify(error, { statusCode: 500 });
    res.status(boomError.output.statusCode).json(boomError.output.payload);
  }
};

/**
 * Fetches a single task by its ID.
 *
 * @async
 * @function getTask
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the task to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the task is fetched.
 * @throws {Boom} - Throws a 404 error if the task is not found or if an error occurs.
 */
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    res.status(200).json(task);
  } catch (error) {
    const boomError = Boom.boomify(error, {
      statusCode: error.isBoom ? error.output.statusCode : 404,
    });
    res.status(boomError.output.statusCode).json(boomError.output.payload);
  }
};

/**
 * Creates a new task and saves it in the database.
 *
 * @async
 * @function createTask
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The data for the new task.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the task is created.
 * @throws {Boom} - Throws a 409 error if the task creation fails.
 */
export const createTask = async (req, res) => {
  const task = req.body;
  try {
    const newTask = await taskService.createNewTask(task);
    res
      .status(201)
      .json({ message: `Task ${task.title} created successfully`, newTask });
  } catch (error) {
    const boomError = Boom.boomify(error, { statusCode: 409 });
    res.status(boomError.output.statusCode).json(boomError.output.payload);
  }
};

/**
 * Updates an existing task by its ID.
 *
 * @async
 * @function updateTask
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the task to update.
 * @param {Object} req.body - The new data for the task.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the task is updated.
 * @throws {Boom} - Throws a 404 error if the task is not found or if an error occurs.
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = req.body;
    const updatedTask = await taskService.updateTaskById(id, task);
    res.status(200).json({
      message: `Task with id ${id} updated successfully`,
      updatedTask,
    });
  } catch (error) {
    const boomError = Boom.boomify(error, {
      statusCode: error.isBoom ? error.output.statusCode : 404,
    });
    res.status(boomError.output.statusCode).json(boomError.output.payload);
  }
};

/**
 * Deletes a task by its ID.
 *
 * @async
 * @function deleteTask
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the task to delete.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted.
 * @throws {Boom} - Throws a 404 error if the task is not found or if an error occurs.
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTaskById(id);
    if (!deletedTask) {
      throw Boom.notFound('Task not found');
    }
    res.status(200).json({
      message: `Task with id ${id} deleted successfully`,
    });
  } catch (error) {
    const boomError = Boom.boomify(error, {
      statusCode: error.isBoom ? error.output.statusCode : 404,
    });
    res.status(boomError.output.statusCode).json(boomError.output.payload);
  }
};
