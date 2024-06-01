const productModel = require("../models/productModel");

const categoryTranslations = {
  'Airpodes': 'Auriculares',
  'furniture': 'Muebles',
  'clothing': 'Ropa',

};

const translateCategory = (category) => {
  return categoryTranslations[category] || category;
};

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");
    console.log("category", productCategory);

    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ category });
      if (product) {
        // Traducir la categoría antes de agregar al array
        product.category = translateCategory(category);
        productByCategory.push(product);
      }
    }

    res.json({
      message: "Categoría de Productos",
      data: productByCategory,
      success: true,
      error: false
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = getCategoryProduct;
