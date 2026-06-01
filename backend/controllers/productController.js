import Product from "../models/Product.js";

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const { name, sku, category, quantity, price, supplier, description } =
      req.body;

    const existingSku = await Product.findOne({ sku: sku?.toUpperCase() });
    if (existingSku) {
      res.status(400);
      throw new Error(`Product with SKU '${sku}' already exists`);
    }

    const product = await Product.create({
      name,
      sku,
      category,
      quantity,
      price,
      supplier,
      description,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Check SKU uniqueness if SKU is being changed
    if (req.body.sku && req.body.sku.toUpperCase() !== product.sku) {
      const existingSku = await Product.findOne({
        sku: req.body.sku.toUpperCase(),
      });
      if (existingSku) {
        res.status(400);
        throw new Error(`Product with SKU '${req.body.sku}' already exists`);
      }
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
