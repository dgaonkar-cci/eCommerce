const carts = require ('../models').carts;
//const inventories = require ('../models').inventories;


//const items = require('../models').items;


module.exports = {
    //create
  create(req, res) {
    return carts
      .create({
      quantity:req.body.quantity,
      custId:req.body.custId,
      itmId:req.body.itmId,
      })
      .then(carts => res.status(201).send(carts))
      .catch(error => res.status(400).send(error));
  },



  //list
  list(req,res){
    return carts
    .findAll()
    .then(carts => res.status(201).send(carts))
    .catch(error => res.status(400).send(error));
  },

  //delete
 

  getcust(req, res) {      
    let custId = req.params.custId;       
    
     var condition = { 
    where: {custId: req.params.custId }        
        }       
         return carts          
          .findAll(condition).then(carts => {             
           res.send(carts);           
         });  
    },
  


};

