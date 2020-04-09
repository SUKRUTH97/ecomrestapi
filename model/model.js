const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Products = new Schema(
  {
    title: { type: String },
    image: { type: String },
    price: { type: String },
    company: { type: String },
    info: { type: String },
    inCart: { type: String },
    count: { type: Number },
    total: { type: Number },
  },
  { collection: 'products' }
);

module.exports = mongoose.model('Products', Products);
