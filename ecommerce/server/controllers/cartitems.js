const cartitems = require('../models').cartitems;
const inventories = require ('../models').inventories;

module.exports = {


  //list
 
  

  list(req, res) {      
    //let custmId = req.params.custmId;       
       
     var condition = { 
    where: {custid: req.params.custid }        
        }       
         return cartitems           
          .findAll(condition).then(cartitems => {             
           res.send(cartitems);           
         });  
    },


  delete(req, res) {
      //return carts
  var itmId=req.body.itmId
  var custid=req.body.custid
  cartitems.findOne({
  
    where: {itmId,custid},
  }).then(function (data) {
    if(data){
      var qty= data.quantity;
  
      cartitems.destroy(     
              {where:{itmId:itmId,custid:custid}}
             )
            .then(cartitems => res.status(200).send("item removed successfully from the cart"))
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