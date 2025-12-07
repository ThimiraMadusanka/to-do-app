const Tasks = require('../models/tasks.model');

// Get tasks
const getTasks = async () => {
    try {
        // Find latest 5 task
        const tasks = await Tasks.findAll({
            where: {
                isCompleted: false
            },
            limit: 5,
            order: [['createdAt', 'DESC']]
        });
        return tasks;
    } catch (error) {
        const errorRes = new Error(`${error.message}`);
        errorRes.status = 400;
        throw errorRes;
    }
}

// Create task
const createTask = async (task) => {
    const { title, description } = task;
    try {
        // Create new task
        const newTask = await Tasks.create({ 
            title,
            description
        });
        return newTask;
    } catch (error) {
        const errorRes = new Error(`${error.message}`);
        errorRes.status = 400;
        throw errorRes;
    }
}

// Complete task
const completeTask = async (id) => {
    try {
        // Find task by id
        const task = await Tasks.findOne({
            where: { 
                id: id
            }
        });
        // Check task existence
        if (task === null) {
            const error = new Error(`Task not found with id: ${id}`);
            error.status = 404;
            throw error;
        } else {
            // Mark task as completed
            task.isCompleted = true;
            await task.save();
        };
        return task;
    } catch (error) {
        const errorRes = new Error(`${error.message}`);
        errorRes.status = 400;
        throw errorRes;
    }
}

module.exports = { 
    getTasks,
    createTask,
    completeTask
}