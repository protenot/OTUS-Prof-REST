const EntitySchemaUser = require("typeorm").EntitySchema;

module.exports = new EntitySchemaUser({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "character varying",
      length: 1000,
    },

    name: {
      type: "character varying",
      length: 100,
    },
    email: {
      type: "text",
    },

    role: {
      type: "character varying",
      length: 100,
    },
    password: {
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
