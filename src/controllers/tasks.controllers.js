import { TASKS, updateTasksList } from "../db";
export const deleteTask = (req, res) => {
    const user = req.user;
    if (user && user.role === "Interviewer") {
        const taskId = req.params.id;
        const updatedTasks = TASKS.filter((task) => task.id !== taskId);
        updateTasksList(updatedTasks);
        res.status(200).json({ message: `Task '${taskId}' deleted` });
    }
    else {
        res.status(403).json({ message: "Permission denied" });
    }
};
export const updateTaskController = (req, res) => {
    const taskId = req.params.id;
    const foundTask = TASKS.find((task) => task.id === taskId);
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
