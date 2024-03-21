const typeorm = require("typeorm");
//import {DataSource} from 'typeorm'

module.exports = {
  default: new typeorm.DataSource({
    //export const myDataSource2Pg =    new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Pr0ten0t",
    database: "otusdb",

    entities: ["dist/models/*.entity.js"],
    //migrations: ['./migrations/*.js'],
    //migrationsTableName: '__migrations',
  }),
};
