'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) { // crear relaciones entre los modelos (post -> user)
      // definir asociacion aqui
      //userId es la llave foranea
      this.belongsTo(User,{foreignKey: 'userId' }) // este {post} pertenece a un {usuario}

    }
    ///Vamos a ocultar el usuario
    toJSON(){
      return {...this.get(), id: undefined, userId: undefined }
    }
  }
  Post.init({
    //cambiar el type de body
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,

    },
    body:{

      type: DataTypes.STRING,
      allowNull: false
    }, 
    
  }, {
    sequelize,
    tableName: 'posts', //no olvidar cambiar el nombre a la tabla
    modelName: 'Post',
  });
  return Post;
};