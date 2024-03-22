const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Task",
  tableName: "tasks",
  columns: {
    id: {
      primary: true,
      type: "character varying",
      length: 100,
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
      length: 100,
    },
    tag: {
      type: "character varying",
      length: 1000,
    },
  },
  relations: {
    anotherEntity: {
      target: "Comment",
      type: "one-to-one",
      joinColumn: { name: "id" },
      onDelete: "CASCADE",
    },
  },
});
