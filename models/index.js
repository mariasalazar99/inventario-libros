const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

let sequelize;

if (config.dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage
  });
} else {
  // Para otros motores como MySQL/Postgres
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

// Importar modelos
db.Usuario = require('./usuario')(sequelize, DataTypes);
db.Libro = require('./libro')(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
