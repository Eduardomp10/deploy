const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    
    
  },{timestamps: false}
  );
};
