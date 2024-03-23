const typeorm = require("typeorm");

module.exports = {
  default: new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Pr0ten0t",
    database: "otusdb",

    entities: ["dist/src/models/*.entity.js"],
    //migrations: ['./migrations/*.js'],
    //migrationsTableName: '__migrations',
  }),
};
