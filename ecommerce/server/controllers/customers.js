const customers = require('../models').customers;
const orders = require('../models').orders;
const carts = require('../models').carts;
const orderitems = require('../models').orderitems;
const items = require('../models').items;

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


    if(req.body.payId==null)
    {
      res.send("please select the payment mode");
    }
    else{
    var custId = req.params.id;
    var itmId = req.params.itmId;

    carts.findOne({
      where: { custId, itmId },
    }).then(function (data) {
      if (!data) {

        res.send("customer or items is not present in the cart");
      }

      else {

        items.findOne({
          where:{id: itmId},
        }).then(function (item){
          if (item){
            var price=item.price;

        orders.create({
          orderDate: req.body.orderDate,
          orderNo: req.body.orderNo,
          amount: price,
          status: req.body.status,
          custmId: custId,
          payId: req.body.payId
        
        })
          .then(function (order) {
            if (order) {
             // res.send(order);

              // find quantity
              carts.findOne({
                where: { custId, itmId },
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
                  carts.destroy(
                    { where: { custId, itmId } }
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
    
};