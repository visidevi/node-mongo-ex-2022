const Product = require('../models/product.model');
exports.create = async (req, reply) => {
  try {
    const product = await Product.create(req.body);
    reply.status(201).send({
      data: product,
    });
  } catch (err) {
    reply.status(500).send({
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.getProducts = async (req, reply) => {
  try {
    const products = await Product.find();
    reply.status(200).send({
      data: products,
    });
  } catch (err) {
    reply.status(500).send({
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.getProduct = async (req, reply) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    reply.code(200).send({
      data: product,
    });
  } catch (err) {
    reply
      .status(400)
      .send({ error: err, message: err.message, stack: err.stack });
  }
};
exports.updateProduct = async (req, reply) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    reply.code(200).send({
      data: product,
    });
  } catch (err) {
    reply
      .status(400)
      .send({ error: err, message: err.message, stack: err.stack });
  }
};

exports.deleteProduct = async (req, reply) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    reply.code(204).send({
      data: null,
    });
  } catch (err) {
    reply.status(500).send({ ...err });
  }
};
