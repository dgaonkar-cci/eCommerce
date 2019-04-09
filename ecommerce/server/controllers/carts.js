const carts = require ('../models').carts;
const inventories = require ('../models').inventories;


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
  delete(req, res) {
    //return carts
var itmId=req.params.itmId
var custId=req.params.custId
carts.findOne({

  where: {itmId,custId},
}).then(function (data) {
  if(data){
    var qty= data.quantity;

 carts.destroy(     
            {where:{itmId:itmId,custId:custId}}
           )
          .then(carts => res.status(200).send("item removed successfully from the cart"))
          //.catch((error) => res.status(400).send(error));

inventories.findOne({
  where:{itemId:itmId},
}).then(function (item){
 if(item){
   var qtt=item.quantity + qty;

   inventories.update(
     {quantity:qtt},
     {where:{itemId:itmId},
   })
 }
})



        }
        })






  },
  


};

