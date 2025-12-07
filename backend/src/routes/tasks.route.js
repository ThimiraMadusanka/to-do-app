const express = require("express");
const router = express.Router();
const TasksController = require('../controllers/tasks.controller');

router.get("/", TasksController.getTasks);

router.post("/", TasksController.createTask);

router.patch("/:id", TasksController.completeTask);

module.exports = router;
