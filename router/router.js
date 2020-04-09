const express = require('express');
const productRoute = express.Router();
const Products = require('../model/model');

productRoute.route('/getproducts').get(function (req, res) {
  Products.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

productRoute.route('/addproduct').post(function (req, res) {
  let product = new Products(req.body);
  product
    .save()
    .then((obj) => {
      res.status(200).json({ message: 'Product added..' });
    })
    .catch((err) => {
      res.status(200).json({ message: 'Error: cannot add the product..' });
    });
});

productRoute.route('/deleteproduct/:id').delete(function (req, res) {
  let id = req.params.id;

  Products.findByIdAndDelete({ _id: id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: 'Product deleted..' });
    }
  });
});

productRoute.route('/editproduct/:id').get(function (req, res) {
  let id = req.params.id;
  Products.findById({ _id: id }, function (err, data) {
    res.json(data);
  });
});

productRoute.route('/updateproduct/:id').patch(function (req, res) {
  let id = req.params.id;
  Products.findById({ _id: id }, function (err, data) {
    if (!data) {
      res.status(200).json({ message: 'No data found..' });
    } else {
      data.title = req.body.title;
      data.image = req.body.image;
      data.price = req.body.price;
      data.company = req.body.company;
      data.info = req.body.info;
      data.inCart = req.body.inCart;
      data.count = req.body.count;
      data.total = req.body.total;
    }
    data
      .save()
      .then((obj) => res.status(200).json({ message: 'Product updated..' }));
  }).catch((err) => {
    res.status(200).json({ message: 'Error: cannot update..' });
  });
});

module.exports = productRoute;
