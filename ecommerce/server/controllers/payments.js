const payments = require('../models').payments;

module.exports = {
    //create
  create(req, res) {
    return payments
      .create({
       type:req.body.type,
      })
      .then(payments => res.status(201).send(payments))
      .catch(error => res.status(400).send(error));
  },

  //list
  list(req,res){
    return payments
    .findAll()
    .then(payments => res.status(201).send(payments))
    .catch(error => res.status(400).send(error));
  },


};