import Fastify from 'fastify';

/***************************************************
 * PLEASE DO NOT MODIFY ANYTHING HERE
 *
 * This would ideally be stored in an actual database, however in memory arrays serves the purpose here.
 *************************************************/
// DATABASE TABLES
const Hotels = [
  { id: 1, name: "Kempiski hotel", location: "Westlands" },
  { id: 2, name: "Hilton hotel", location: "CBD" },
  { id: 3, name: "Serena hotel", location: "Thika" },
];

const MenuItems = [
  { id: 1, name: "Sukuma wiki", price: 50 },
  { id: 2, name: "Nyama Choma", price: 170 },
  { id: 3, name: "Soda", price: 25 },
];

const Orders = [
  { id: 1, hotel_id: 1, items: [1, 2] },
  { id: 2, hotel_id: 3, items: [3, 2] },
  { id: 3, hotel_id: 1, items: [3, 3, 1] },
];


/***************************************************
 * YOU CAN MODIFY EVERYTHING BELOW AS YOU WISH
 *************************************************/

// SERVER SETUP
const app = Fastify({ logger: true });
app.register(require('fastify-formbody'));

/*********************
 * For simplicity purposes, we only expose three endpoints for each resource
 *  1. Create resource endpoint,
 *  2. Fetch single resource by ID endpoint,
 *  3. Fetch a list of resources endpoint
 *
 * NOTE: For POST endpoints, the accepted content type is either application/x-www-form-urlencoded or application/json
 ********************/

// Create hotel
app.post('/create-hotel', function (req, res) {
  console.log({
    body: req.body,
    params: req.params
  })
  try {
    const hotel = {
      id: Math.max(...Hotels.map(hotel => hotel.id)) + 1,
      name: req.body['name'],
      location: req.body['location']
    };
    Hotels.push(hotel);
    res.send(hotel)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});

// Fetch list of hotels
app.get('/hotels', function (req, res) {
  try {
    res.send(Hotels)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});

// Get single hotel
app.get('/get-hotel-by-id/:id', function (req, res) {
  try {
    const hotel = Hotels.find(h => h.id == req.params['id'])
    res.send(hotel)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});


// Create a menu item
app.post('/menu-item-new', function (req, res) {
  try {
    const menuItem = {
      id: Math.max(...MenuItems.map(hotel => hotel.id)) + 1,
      name: req.body['name'],
      price: req.body['price']
    };
    MenuItems.push(menuItem);
    res.send(menuItem)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});

// Fetch a list of menu items
app.get('/list-menu-items', function (req, res) {
  try {
    res.send(MenuItems)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});

// Get a single menu item by id
app.get('/menu-items/:id', function (req, res) {
  try {
    const menuItem = MenuItems.find(h => h.id == req.params['id'])
    res.send(menuItem)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});

// Create a order item
app.post('/order-item-new', function (req, res) {
  try {
    const orders = {
      id: Math.max(...Orders.map(order => order.id)) + 1,
      hotel_id: req.body['hotel_id'],
      items: req.body['itmes']
    };
    Orders.push(orders);
    res.send(orders)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});

// Fetch a list of menu items
app.get('/list-order-items', function (req, res) {
  try {
    res.send(Orders)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});

// Get a single menu item by id
app.get('/order-items/:id', function (req, res) {
  try {
    const orders = Orders.find(h => h.id == req.params['id'])
    res.send(orders)
  } catch (error) {
    console.log(error)
    res.code(400).send({ error: 'Invalid request' });
  }
});


// START SERVER
app.listen(3000, '0.0.0.0', function (err, address) {
  if (err) {
    app.log.error(err.message);
    process.exit(1);
  }
  app.log.info(`Server listening on port ${address}`);
});