import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  const { productId, quantity, colors, sizes } = req.body;

  const session = await mongoose.startSession(); // Start session
  session.startTransaction();

  try {
    let cart = await Cart.findOne({ user: req.user.id }).session(session); // Use session for transaction
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    const colorIndex = cart.items.findIndex(items => items.colors === colors);
    const sizeIndex = cart.items.findIndex(items => items.sizes === sizes);
    if (itemIndex > -1 && colorIndex > -1 && sizeIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        name: product.name, // From Product model
        quantity,
        price: product.price, // From Product model
        colors,
        sizes,
      });
    }

    // Calculate total amount and total items
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save({ session }); // Save cart with session

    await session.commitTransaction();
    res.status(200).json({ message: 'Product added to cart', productId, quantity });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    session.endSession();
  }
};

export const getCart = async (req, res) => {
  // Logic to get the user's cart
  try {
    const cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export const removeFromCart = async (req, res) => {

  const  itemId  = req.params.id;

  // Logic to remove the product from the cart
  try {

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Invalide user for this Cart ' });
    }

  const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    // Remove item from cart.items array
    const removedItem = cart.items[itemIndex];
    const removeSuccess = cart.items.splice(itemIndex,1);

    if (!removeSuccess) {
      return res.status(400).json({success: false, message: "Can not remove"})
    }


    // Update cart totals (optional, based on schema)
    cart.totalItems -= removedItem.quantity;
    cart.totalAmount -= removedItem.quantity * removedItem.price;
        await cart.save();
    return res.status(200).json({success: true, message: "Item remove from Cart successfully"})

  } catch (error) {
    console.error('Error removing from cart:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export const clearCart = async (req, res) => {
  // Logic to clear the user's cart
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user },
      { $set: { items: [] } }
    );
    cart.totalAmount = 0;
    cart.totalItems = 0;
    await cart.save()
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
