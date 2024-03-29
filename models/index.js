'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.admin = require('./admin')(sequelize, Sequelize);
db.link = require('./link')(sequelize, Sequelize);
db.category = require('./category')(sequelize, Sequelize);

db.category.hasMany(db.link, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.link.belongsTo(db.category, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

sequelize.sync()
  .then(() => console.log('DB SYNC'))
  .catch((err) => {
    console.log({err: err})
  })

module.exports = db;
