const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name:"Comment",
    tableName:"comments",
    columns:{
        id:{
            primary:true,
            type:"character varying",
            length:25
        },
        idUser:{
            type:"character varying",
            length:25
        },
        idTask:{
            type:"character varying",
            length:25
        },
        commentText:{
            type:"text",
            
        },
    }
})