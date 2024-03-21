const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Task",
  tableName: "tasks",
  columns: {
    id: {
      primary: true,
      type: "character varying",
      length: 25,
    },
    description: {
      type: "text",
    },
    solution: {
      type: "text",
    },
    complexity: {
      type: "integer",
    },
    language: {
      type: "character varying",
      length: 25,
    },
    tag: {
      type: "character varying",
      length: 1000,
    },
  },
});
