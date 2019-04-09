const inventories = require('../models').inventories;

module.exports = {
    //create
  create(req, res) {
    return inventories
      .create({
      quantity:req.body.quantity,
      itemId:req.body.itemId,
      })
      .then(inventories => res.status(201).send(inventories))
      .catch(error => res.status(400).send(error));
  },

  //list
  list(req,res){
    return inventories
    .findAll()
    .then(inventories => res.status(201).send(inventories))
    .catch(error => res.status(400).send(error));
  },


};