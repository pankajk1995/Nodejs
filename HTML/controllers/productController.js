const Product = require('../model/product');

// Method to render the products page
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.render('products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Method to handle adding a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  console.log(name)
  try {
    // Creating a new product
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl
    });

    // Saving the product to the database
    await newProduct.save();

    // Redirecting back to the products page
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
 
};
