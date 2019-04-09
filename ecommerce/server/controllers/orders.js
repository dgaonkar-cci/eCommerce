const orders = require('../models').orders;

module.exports = {
    //update status
    update(req, res) {
      return orders
            .update({
              id: req.params.id,
              status: req.body.status,
              },
              {where:{id: req.params.id}}
            )
            .then(orders => res.status(200).send("status updated"))
            .catch((error) => res.status(400).send(error));
    },

    //status as parameter

    getstatus(req, res) {      
      let status = req.params.status;       
      
       var condition = { 
      where: {status: req.params.status }        
          }       
           return orders           
            .findAll(condition).then(orders => {             
             res.send(orders);           
           });  
      },

      //based on customer
      getid(req, res) {      
        let custmId = req.params.custmId;       
           
         var condition = { 
        where: {custmId: req.params.custmId }        
            }       
             return orders           
              .findAll(condition).then(orders => {             
               res.send(orders);           
             });  
        },


        getByDate(req, res) {      
          let orderDate = req.params.orderDate;       
          
          var dateoforder = new Date(orderDate);  
           var condition = { 
          where: {orderDate: dateoforder }        
              }       
               return orders           
                .findAll(condition).then(orders => {             
                 res.send(orders);           
               });   
               },
          
          

  

  //list
  list(req,res){
    return orders
    .findAll()
    .then(orders => res.status(201).send(orders))
    .catch(error => res.status(400).send(error));
  },


};