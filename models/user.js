'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */


    static associate({Post}) {
      // definir asociacion aqui
      this.hasMany( Post, {foreignKey: 'userId'}); //este usuario tiene muchos posts
    }
    ///////////////ocultar un dato al hacer post (queda en la db)/////////////
    toJSON(){
        return {...this.get(),id: undefined}
    } 
    ///////////////////////////
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg: 'User must have a name'},
        notEmpty : {msg: 'Name must not be empty'}
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg: 'User must have a e-mail'},
        notEmpty : {msg: 'e-mail must not be empty'}
      }

    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg: 'User must have a role'},
        notEmpty : {msg: 'role must not be empty'}
      }

    },
  }, {
    sequelize,
    tableName: 'usuarios',
    modelName: 'User',
  });
  return User;
};