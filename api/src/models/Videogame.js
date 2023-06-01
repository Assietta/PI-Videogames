const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('videogame', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4, // Valida que el ID sea un UUID válido (versión 4)
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    plataformas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaLanzamiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    isDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
