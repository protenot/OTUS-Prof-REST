export const EntitySchemaComment = require("typeorm").EntitySchema;

module.exports = new EntitySchemaComment({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: {
        primary: true,
      type: "character varying",
      length: 100,
    },
    idUser: {
     
      type: "character varying",
      length: 100,
    },
    idTask: {
      type: "character varying",
      length: 100,
    },
    commentText: {
      type: "text",
    },
  },
});
