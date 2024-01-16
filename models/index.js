const Sequelize = require("sequelize");
const { envConfig } = require("../config/db_config");

let db = {};
const sequelizeIns = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  envConfig
);
db.sequelize = sequelizeIns;
db.Tenant = require("./tenant")(sequelizeIns, Sequelize);
db.Permissions = require("./permissions")(sequelizeIns, Sequelize);

module.exports =  db ;
