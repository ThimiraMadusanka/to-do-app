const tasksService = require('../services/tasks.service');

// Get Tasks
const getTasks = async (req, res, next) => {
  try {
    res.json(await tasksService.getTasks());
  } catch (err) {
    console.error('Error while getting tasks : ', err.message);
    next(err);
  }
};

// Create Task
const createTask = async (req, res, next) => {
  try {
    res.status(201).json(await tasksService.createTask(req.body));
  } catch (err) {
    console.error('Error while creaing tasks : ', err.message);
    next(err);
  }
};

// Complete Task
const completeTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await tasksService.completeTask(id));
  } catch (err) {
    console.error('Error while completing tasks : ', err.message);
    next(err);
  }
};

module.exports = {
    getTasks,
    createTask,
    completeTask
}
