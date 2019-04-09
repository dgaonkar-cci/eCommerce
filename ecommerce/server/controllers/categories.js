const categories = require('../models').categories;

module.exports = {
    //create
  create(req, res) {
    return categories
      .create({
        name:req.body.name,
      })
      .then(categories => res.status(201).send(categories))
      .catch(error => res.status(400).send(error));
  },

  //list
  list(req,res){
    return categories
    .findAll()
    .then(categories => res.status(201).send(categories))
    .catch(error => res.status(400).send(error));
  },


};