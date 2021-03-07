const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id'
        },
        onDelete: 'cascade' // if a product is deleted, then delete corresponding rows from the product_tag table 
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tag',
            key: 'id'
        },
        onDelete: 'cascade' // if a tag is deleted, then delete corresponding rows from the product_tag table 
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
