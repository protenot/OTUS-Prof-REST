const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name:"User",
    tableName:"users",
    columns:{
        id:{
            primary:true,
            type:"character varying",
            length:25
        },
       
        name:{
            type:"character varying",
            length:25
        },
        email:{
            type:"text",
            
        },

        role:{
            type:"character varying",
            length:10
        },
        password:{
            type:"character varying",
            length:30
        },
    }
})