const subcategories = require('../models').subcategories;

module.exports = {
    //create
  create(req, res) {
    return subcategories
      .create({
        name:req.body.name,
        catId:req.body.catId,
      })
      .then(subcategories => res.status(201).send(subcategories))
      .catch(error => res.status(400).send(error));
  },

  //list
  list(req,res){
    return subcategories
    .findAll()
    .then(subcategories => res.status(201).send(subcategories))
    .catch(error => res.status(400).send(error));
  },


};