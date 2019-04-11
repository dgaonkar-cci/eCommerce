const items = require('../models').items;
const inventories = require('../models').inventories;
const carts = require('../models').carts;
const cartitems = require('../models').cartitems;
const Sequelize = require('sequelize');
//const orderitems = require('../models').orderitems;
const Op = Sequelize.Op;


module.exports = {

  //create
  create(req, res) {
    if (req.body.price == null) {
      res.send("Please enter the price of the item");
    }
    else if (req.body.color == null) {
      res.send("Please specify the color of the item");
    }
    else if (req.body.size == null) {
      res.send("Please specify the size of the item");
    }
    else {
      //return items
      items.create({
        name: req.body.name,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        subId: req.body.subId,
      })
        .then(items => res.status(201).send(items))
        .catch(error => res.status(400).send(error));
    }
  },

  //list
  list(req, res) {
    return items
      .findAll()
      .then(items => res.status(201).send(items))
      .catch(error => res.status(400).send(error));
  },

  //check inventories
  insertCart(req, res) {
    var id = req.body.id;
    var stock = req.body.stock;
    var custId = req.params.custId;

    inventories.findOne({
      where: { id, quantity: { [Op.lt]: stock } },
    })
      .then(function (data) {
        if (!data) {

          inventories.findOne({
            where: { itemId: id },
          }).then(function (inv) {
            if (inv) {
              var qty = inv.quantity - stock;
              // if(qty>=0)
              //{

              carts.findOne({
                where: { custId },
              }).then(function (present) {
                if (!present) {

                  carts.create({
                    custId: custId,
                  }).then(function (newCart) {
                    if(newCart)
                    {
                      cartitems.create({
                        quantity: stock,
                        itmId: id,
                        custid: custId,
                        cartId: newCart.id,
                      }).then(cartitems => res.status(201).send(cartitems))
    
                    }
                  })

                  inventories.update(
                    { quantity: qty },
                    {
                      where: { itemId: id },

                    })
                }
                else {
                  cartitems.findOne({

                  where: { custId:custId,itmId: id },
                  }).then(function (itm) {
                    if (!itm) {
                      cartitems.create({
                        quantity: stock,
                        itmId: id,
                        custid: custId,
                        cartId: present.id
                      }).then(cartitems => res.status(201).send(cartitems))

                      inventories.update(
                        { quantity: qty },
                        {
                          where: { itemId: id },

                        })
                    }
                    else {
                      res.send("You have already added item in your cart");
                    }

                  })

                }


              })


              // var qty=inventories.decrement(['quantity'],{by: stock, where:{itemId:id}})

              // }else
              // { res.send("items ..is out of stock")}
            }
          })

        }
        else {

          res.send("item is out of stock");

        }
      })
  },


};
