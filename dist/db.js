"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTasksList = exports.TASKS = exports.updateUserList = exports.USERS = void 0;
const uuid_1 = require("uuid");
exports.USERS = [
    {
        id: (0, uuid_1.v4)(),
        name: "Olga",
        surname: "Belaya",
        email: "protenot@gmail.com",
        role: "User",
    },
];
const updateUserList = (newUsers) => {
    exports.USERS = newUsers;
};
exports.updateUserList = updateUserList;
exports.TASKS = [
    {
        id: "12345",
        description: "Здесь будет задача 1",
        solution: "Здесь будет решение задачи 1",
        complexity: 89,
        language: "TypeScript",
        tag: "Aлгоритмы",
    },
    {
        id: "12346",
        description: "Здесь будет задача 2",
        solution: "Здесь будет решение задачи 2",
        complexity: 89,
        language: "JavaScript",
        tag: "Cтруктуры данных",
    },
    {
        id: "12347",
        description: "Здесь будет задача 3",
        solution: "Здесь будет решение задачи 3",
        complexity: 5,
        language: "JavaScript",
        tag: "Динамическое программирование",
    },
];
const updateTasksList = (newTasks) => {
    exports.TASKS = newTasks;
};
exports.updateTasksList = updateTasksList;
