const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100] // Limita la longitud entre 2 y 100 caracteres
      }
    },
    
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 500] // Limita la longitud a un máximo de 500 caracteres
      }
    },
    
    platforms: {
      type: DataTypes.STRING,
      unique: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true // Valida que el valor sea una URL válida
      }
    },
    
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['E', 'T', 'M']] // Solo permite los valores 'E', 'T' o 'M'
      }
    },
    
    isDB: {
      type: DataTypes.BOOLEAN
    }
  });
};
