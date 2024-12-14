import Boom from '@hapi/boom';
import Task from '../models/taskSchema.js';
import { createTaskHistory } from './taskHistoryService.js';

/**
 * Retrieves all tasks from the database with optional filters.
 *
 * This function queries the Task model with the provided filters and sorts the results
 * by the `dueDate` in ascending order. The filters can include criteria for `status`,
 * `priority`, `tags`, and `dueDate` range (start and end dates).
 *
 * @param {Object} filters - Optional filters to apply to the query. These filters can include:
 *   - `status` (String): Filter tasks by status (e.g., "Pending", "In Progress", "Completed").
 *   - `priority` (String): Filter tasks by priority (e.g., "Low", "Medium", "High").
 *   - `tags` (Array): Filter tasks by tags (tasks that contain all specified tags).
 *   - `dueDate` (Date range): Filter tasks by their `dueDate` using `startDate` and/or `endDate`.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks, sorted by `dueDate` in ascending order.
 *
 * @throws {Boom} - Throws an error if the query fails or any database issues arise.
 */
export const getAllTasks = async (filters = {}) => {
  try {
    return await Task.find(filters).sort({ dueDate: 1 });
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 500 });
  }
};

/**
 * Fetches a task by its ID.
 *
 * @async
 * @function getTaskById
 * @param {string} id - The ID of the task to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the task object.
 * @throws {Boom} - Throws a 404 error if the task is not found or a 500 error for other failures.
 */
export const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw Boom.notFound(`Task with id ${id} not found`);
    }
    return task;
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 400 });
  }
};

/**
 * Creates a new task and saves it in the database.
 *
 * @async
 * @function createNewTask
 * @param {Object} taskData - The data for the new task.
 * @returns {Promise<Object>} - A promise that resolves to the created task object.
 * @throws {Boom} - Throws a 409 error if the creation fails.
 */
export const createNewTask = async (taskData) => {
  try {
    const newTask = await new Task(taskData).save();
    await createTaskHistory(newTask._id, 'Create', 'Task created', taskData);
    return newTask;
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 500 });
  }
};

/**
 * Update a task by its ID with the provided data.
 *
 * This function handles the update of a task, preventing the status from being
 * changed directly from "Pending" to "Completed". It checks whether the task exists
 * before attempting to update it. If the task is not found, a 404 error is returned.
 * @param {String} id - The ID of the task to update.
 * @param {Object} taskData - An object containing the fields to be updated in the task.
 * @returns {Object} - The updated task object.
 * @throws {Boom} - Throws a `Boom.notFound` error if the task is not found.
 */
export const updateTaskById = async (id, taskData) => {
  try {
    const task = await Task.findById(id);

    if (!task) {
      throw Boom.notFound(`Task with id ${id} not found`);
    }

    if (task.status === 'Pending' && taskData.status === 'Completed') {
      throw Boom.badRequest(
        'Cannot change status directly from Pending to Completed'
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(id, taskData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw Boom.notFound(`Task with id ${id} not found`);
    }

    await createTaskHistory(
      updatedTask._id,
      'Update',
      'Updated task',
      taskData
    );

    return updatedTask;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a task by its ID.
 *
 * @async
 * @function deleteTaskById
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<Object>} - A promise that resolves to the deleted task object.
 * @throws {Boom} - Throws a 404 error if the task is not found or a 500 error for other failures.
 */
export const deleteTaskById = async (id) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw Boom.notFound(`Task with id ${id} not found`);
    }
    await createTaskHistory(id, 'Delete', 'Task Deleted', { id });
    return deletedTask;
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 500 });
  }
};
