import * as taskHis from '../services/taskHistoryService.js';

/**
 * Retrieves the task history based on the provided filters.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} [req.query.modificationDate] - The modification date to filter tasks.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the task history is retrieved.
 */
export const getTaskHistory = async (req, res) => {
  try {
    const { modificationDate } = req.query;
    const filters = {};

    if (modificationDate) filters.modificationDate = modificationDate;

    const tasks = await taskHis.getAllTasks(filters);
    res.status(200).json(tasks);
  } catch (error) {
    const boomError = Boom.boomify(error, { statusCode: 500 });
    res.status(boomError.output.statusCode).json(boomError.output.payload);
  }
};
