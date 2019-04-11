const orderitems = require('../models').orderitems;
const Sequelize = require('sequelize');

module.exports = {
    //create
  create(req, res) {
    return orderitems
      .create({
        orderId:req.params.orderId,
      quantity:req.body.quantity,
      amount:req.body.amount,
      status:req.body.status,
      itemsId:req.body.itemsId,
      
      })
      .then(orderitems => res.status(201).send(orderitems))
      .catch(error => res.status(400).send(error));
  },

  //list
  list(req,res){
    return orderitems
    .findAll()
    .then(orderitems => res.status(201).send(orderitems))
    .catch(error => res.status(400).send(error));
  },


  


};



