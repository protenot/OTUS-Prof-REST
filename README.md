## Модель данных

В проекте предусмотрены 3 сущности

1. Пользователь (User)

```plaintext
 +--------------------+
|       User          |
+---------------------+
| - id: string        |
| - name: string      |
| - surname?: string  |
| - email: string     |
| - role?: string     |
| - password?: string |
+---------------------+
2. Задача (Task)
+------------------------+
|          Task          |
+------------------------+
| - id: string           |
| - description: string  |
| - solution: string     |
| - complexity: number   |
| - language: string     |
| - tag: string          |
+------------------------+

3. Комментарий (Comment)
+----------------------+
|       Comment        |
+----------------------+
| - id: string         |
| - idUser: string     |
| - idTask: string     |
| - commentText: string|
+----------------------+
```

## Связи

### User и Comment

**Связь:** Комментарии пользователя
**Тип связи:** Ассоциация  
**Количество:** 1..\*  
**Направление:** От User к Comment
**Описание:** Один пользователь может иметь много комментариев.

```plaintext
+----------------------+---------------------+
|    Comment           |          User       |
+----------------------+---------------------+
| - id: string         |                     |
| - idUser: string     | - id: string        |
| - idTask: string     | - name: string      |
| - commentText: string| - surname?: string  |
|                      | - email: string     |
|                      | - role?: string     |
|                      | - password?: string |
+----------------------+---------------------+

```

### Task и Comment

**Связь:** Комментарии к задаче  
**Тип связи:** Ассоциация  
**Количество:** 1..\*  
**Направление:** От Task к Comment  
**Описание:** Один пользователь может иметь много комментариев.

```plaintext
+---------------------+----------------------+
|       Comment       |          Task        |
+---------------------+----------------------+
|- idTask: string     |- id: string          |
|- id: string         |- description: string |
|- idUser: string     |- solution: string    |
|- commentText: string|- complexity: number  |
|                     |- language: string    |
|                     |- tag: string         |
+---------------------+----------------------+
```

### User и Task

**Связь:** Задачи пользователя  
**Тип связи:** Ассоциация  
**Количество:** 1..\*  
**Направление:** От User к Task  
**Описание:** Один пользователь может иметь много задач.

```plaintext
+---------------------+----------------------+
|         User        |        Task          |
+---------------------+----------------------+
| - id: string        |- id: string          |
| - name: string      |- description: string |
| - surname?: string  |- solution: string    |
| - email: string     |- complexity: number  |
| - role?: string     |- language: string    |
| - password?: string |- tag: string         |
+----------------------+---------------------+
```
