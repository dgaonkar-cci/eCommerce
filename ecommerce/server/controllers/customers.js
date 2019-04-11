const customers = require('../models').customers;
const orders = require('../models').orders;
const cartitems = require('../models').cartitems;
const orderitems = require('../models').orderitems;
const items = require('../models').items;
const Sequelize=require('sequelize')
const Test=require('../models/index');
module.exports = {
  //create
  create(req, res) {

if(req.body.firstname==null)
{
  res.send("Firstname cannot be empty");
}
else if(req.body.address==null)
{
res.send("Please provide your address");
}

    //return customers
    else{
      customers.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
      })
      .then(customers => res.status(201).send(customers))
      .catch(error => res.status(400).send(error));
    }
  },

  //list
  list(req, res) {
    return customers
      .findAll()
      .then(customers => res.status(201).send(customers))
      .catch(error => res.status(400).send(error));
  },


  //create orders

  createOrder(req, res) {
    var custId = req.params.custId;
    var itmId = req.body.itmId;
    var payId = req.body.payId;
    var orderDate = req.body.orderDate;
    var orderNo = req.body.orderNo;
    var status= req.body.status;

    if(req.body.payId==null)
    {
      res.send("Please select the payment mode");
    }
    else{
   

      cartitems.findOne({
      where: { custid:custId, itmId:itmId},
    }).then(function (data) {
      if (!data) {

        res.send("Customer or items is not present in the cart");
      }

      else {

        items.findOne({
          where:{id: itmId},
        }).then(function (item){
          if (item){
            var price=item.price;

        orders.create({
          orderDate: orderDate,
          orderNo: orderNo,
          amount: price,
          status: status,
          custmId: custId,
          payId: payId
        
        })
          .then(function (order) {
            if (order) {
             // res.send(order);

              // find quantity
              cartitems.findOne({
                where: { custid:custId,itmId:itmId },
              }).then(function (data) {
                if (data) {
                var qtty = data.quantity;


               


                    
               orderitems.create({
                    quantity: qtty,
                    itemsId: itmId,
                    orderId:order.id,
                    amount:price * qtty,
                    status:order.status,
                  }) .then(orderitems => res.status(201).send(orderitems))


                  //delete cart after order
                  cartitems.destroy(
                    { where: { custid:custId, itmId:itmId} }
                  )
                  //.then(carts => res.status(201).send(carts))
               }
                })
               
              
              }

            })

              }

            })




          }

        

      })
    }
    },

    findCustomersByOrders(req,res){
                  Test.sequelize.query('CALL findOrders(:custid)',{ replacements: { custid: req.params.custid }, type: Test.sequelize.QueryTypes.SELECT })  
                .then(function (data) {      
                  if (data) {         
                     res.send(data)       
                     }
                      else {         
                         return res.status(404).send({message: 'You have not placed any orders' })       
             }     
             })  
            },


    
};