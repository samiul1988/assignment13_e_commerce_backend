// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id' 
});

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id' 
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id'
});

// ProductTag belongs to Product
ProductTag.belongsTo(Product, {
    foreignKey: 'product_id'
});

// ProductTag belongs to Tag
ProductTag.belongsTo(Tag, {
    foreignKey: 'tag_id'
});

// Product has many ProductTag
Product.hasMany(ProductTag, {
    foreignKey: 'product_id'
});

// Tag has many ProductTag
Tag.hasMany(ProductTag, {
    foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
