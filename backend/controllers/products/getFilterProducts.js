// controllers/productController.js

const productModel = require("../../models/ProductModel");

const getFilteredProducts = async (req, res) => {
  try {
      const { category, brand, sortBy, minPrice, maxPrice } = req.query;
      console.log( category, brand, sortBy, minPrice, maxPrice)
    // Construct the filter query
    let filter = {};

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Brand filter (case-insensitive)
    if (brand) {
      filter.brand = new RegExp(brand, 'i');
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Sorting
    let sortOptions = {};
    if (sortBy === 'priceAsc') sortOptions.price = 1; // Ascending
    else if (sortBy === 'priceDesc') sortOptions.price = -1; // Descending

    // Fetch products based on filters and sorting
    const products = await productModel.find(filter).sort(sortOptions);

    res.status(200).json({
      success: true,
      data: products,
      message: 'Products fetched successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to fetch products',
    });
  }
};

module.exports = {
  getFilteredProducts,
};
