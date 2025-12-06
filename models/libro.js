module.exports = (sequelize, DataTypes) => {
  const Libro = sequelize.define('Libro', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    cantidad_disponible: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  });

  return Libro;
};
