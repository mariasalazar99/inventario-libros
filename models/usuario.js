const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  });

  Usuario.beforeCreate(async (usuario, options) => {
    const hash = await bcrypt.hash(usuario.password, 10);
    usuario.password = hash;
  });

  return Usuario;
};
