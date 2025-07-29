const config = require("../config/db-config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT || 3306,
    dialect: "mysql",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user-model")(sequelize, Sequelize);
db.data = require("../models/data-model")(sequelize, Sequelize);
// db.role = require("../models/role-model")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
// });

// db.ROLES = ["user", "admin"];
module.exports = db;
