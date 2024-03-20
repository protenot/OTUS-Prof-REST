const typeorm = require('typeorm');
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
        synchronize: true,
        logging: true,
        entities: ["dist/models/*.entity.js"],
         //migrations: ['./migrations/*.js'],
         //migrationsTableName: '__migrations',

   })
  }
  /*  myDataSource2Pg.initialize()
  .then(async () => {
    console.log("Connection initialized with datab000ase...", myDataSource2Pg.entities);
  })
  .catch((error) => console.log(error)); */

/*   export const getDataSource = (delay = 3000): Promise<DataSource> => {
    if (myDataSource2Pg.isInitialized) return Promise.resolve(myDataSource2Pg);
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('myDataSource2Pg.isInitialized',myDataSource2Pg.isInitialized)
        if (myDataSource2Pg.isInitialized) resolve(myDataSource2Pg);
        else reject("Failed to create connection with database");
      }, delay);
    });
  }; */
//};


/* const typeorm = require('typeorm');

const initializeDataSource = async () => {
  await typeorm.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Pr0ten0t",
    database: "otusdb",
    entities: ['../models/*.entity.ts'],
  });
};

module.exports = {
  initializeDataSource
};
 */