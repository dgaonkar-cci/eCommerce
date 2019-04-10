const customersController = require('../controllers').customers;
const categoriesController = require('../controllers').categories;
const subcategoriesController = require('../controllers').subcategories;
const itemsController = require('../controllers').items;
const inventoriesController = require('../controllers').inventories;
const paymentsController = require('../controllers').payments;
const cartsController = require('../controllers').carts;
const orderitemsController = require('../controllers').orderitems;
const ordersController = require('../controllers').orders;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Ecommerce application!',
  }));
//for customers
  app.post('/create/customers', customersController.create);
  app.get('/list/customers', customersController.list);
  app.post('/create/orders/:id/:itmId', customersController.createOrder);
  

//for categories
app.post('/create/categories', categoriesController.create);
app.get('/list/categories', categoriesController.list);


//for subcategories
app.post('/create/subcategories', subcategoriesController.create);
app.get('/list/subcategories', subcategoriesController.list);


//for items
app.post('/create/items', itemsController.create);
app.get('/list/items', itemsController.list);
app.post('/create/carts/:id/:quantity', itemsController.insertCart);


//for inventory
app.post('/create/inventory', inventoriesController.create);
app.get('/list/inventory', inventoriesController.list);


//for payments
app.post('/create/payments', paymentsController.create);
app.get('/list/payments', paymentsController.list);


//for carts
app.post('/create/carts', cartsController.create);
app.get('/list/carts', cartsController.list);
app.delete('/delete/carts/:itmId/:custId', cartsController.delete);
app.get('/customer/:custId', cartsController.getcust);


//for orderitems
app.post('/create/orderItems', orderitemsController.create);
app.get('/list/orderItems', orderitemsController.list);

//for orders
app.put('/update/status/:id', ordersController.update);
app.get('/list/orders', ordersController.list);
app.get('/getstatus/:status', ordersController.getstatus);
app.get('/getid/:custmId', ordersController.getid);
app.get('/getByDate/:orderDate', ordersController.getByDate);


};