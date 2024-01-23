"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentsList = exports.COMMENTS = exports.updateTasksList = exports.TASKS = exports.updateUser = exports.updateUserList = exports.USERS = void 0;
exports.USERS = [
    {
        id: "1",
        name: "Olga",
        surname: "Belaya",
        email: "protenot@gmail.com",
        role: "User",
    },
    {
        id: "2",
        name: "Nestor",
        surname: "Petrovich",
        email: "nestor@gmail.com",
        role: "Interviewer",
    },
];
const updateUserList = (newUsers) => {
    exports.USERS = newUsers;
};
exports.updateUserList = updateUserList;
const updateUser = (updateUser) => {
    const userIndex = exports.USERS.findIndex((user) => user.id === updateUser.id);
    if (userIndex !== -1) {
        exports.USERS[userIndex] = updateUser;
    }
};
exports.updateUser = updateUser;
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
exports.COMMENTS = [
    {
        id: "15",
        idUser: "1",
        idTask: "12345",
        commentText: "Это комментарий к задаче 12345",
    },
    {
        id: "16",
        idUser: "1",
        idTask: "12346",
        commentText: "Это комментарий к задаче 12346",
    },
];
const updateCommentsList = (newComments) => {
    exports.COMMENTS = newComments;
};
exports.updateCommentsList = updateCommentsList;
