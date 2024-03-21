export const EntitySchemaComment = require("typeorm").EntitySchema;

module.exports = new EntitySchemaComment({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: {
      type: "character varying",
      length: 25,
    },
    idUser: {
      primary: true,
      type: "character varying",
      length: 25,
    },
    idTask: {
      type: "character varying",
      length: 25,
    },
    commentText: {
      type: "text",
    },
  },


});
