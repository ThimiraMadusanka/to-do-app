const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');

class Tasks extends Model {}

Tasks.init(
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id'
    },
    title: { 
      type: DataTypes.STRING(255), 
      allowNull: false,
      field: 'title' 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true,
      field: 'description' 
    },
    isCompleted: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: false,
      field: 'is_completed' 
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    },
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    underscored: true,
  }
);
  
module.exports = Tasks;
