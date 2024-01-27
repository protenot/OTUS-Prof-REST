"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskController = exports.deleteTask = void 0;
const db_1 = require("../db");
const deleteTask = (req, res) => {
  const user = req.user;
  if (user && user.role === "Interviewer") {
    const taskId = req.params.id;
    const updatedTasks = db_1.TASKS.filter((task) => task.id !== taskId);
    (0, db_1.updateTasksList)(updatedTasks);
    res.status(200).json({ message: `Task '${taskId}' deleted` });
  } else {
    res.status(403).json({ message: "Permission denied" });
  }
};
exports.deleteTask = deleteTask;
const updateTaskController = (req, res) => {
  const taskId = req.params.id;
  const foundTask = db_1.TASKS.find((task) => task.id === taskId);
  if (!foundTask) {
    res.sendStatus(404);
    return;
  }
  foundTask.description = req.body.description;
  foundTask.solution = req.body.solution;
  foundTask.complexity = req.body.complexity;
  foundTask.language = req.body.language;
  foundTask.tag = req.body.tag;
  res.json(foundTask);
};
exports.updateTaskController = updateTaskController;
