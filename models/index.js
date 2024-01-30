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
db.User = require("./user")(sequelizeIns, Sequelize);
db.Application = require("./application")(sequelizeIns, Sequelize);
db.Permissions = require("./permissions")(sequelizeIns, Sequelize);
db.Tenant = require("./tenant")(sequelizeIns, Sequelize);
db.Role = require("./role")(sequelizeIns, Sequelize);
db.UserRole = require("./userRole")(sequelizeIns, Sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});
module.exports =  db ;
