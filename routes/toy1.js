var express = require('express');
const Toy1Models= require('../Models/Toy1Models');
var router = express.Router()

router.get('/', async(req, res)=>{
    var toys = await Toy1Models.find({});
    var total = await Toy1Models.count();
    res.render('toy1/index', {toys: toys, total: total})
})
//Search function
router.post('/search', async(req , res)=>{
    var keyword = req.body.keyword;
    var toys = await Toy1Models.find({name: new RegExp(keyword, "i")})
    res.render('toy1/index', { toys: toys})
})
//Sort function
router.get('/ascending', async(req, res)=>{
    var toys = await Toy1Models.find().sort({quantity: 1})
    res.render('toy1/index', {toys: toys})
})
router.get('/descending', async(req, res)=>{
    var toys = await Toy1Models.find().sort({quantity: -1})
    res.render('toy1/index', {toys: toys})
})

router.get('/list', async (req, res) => {
    var toys = await Toy1Models.find({});
    res.render('toy1/list', { toys: toys });
})

router.get('/toy1/delete/:id', async(req, res) => {
    // var id = req.params.id;
    // var mobile = await MobileModel.findById(id);
    // await MobileModel.deleteOne(mobile);
  
    await Toy1Models.findByIdAndDelete(req.params.id)
    .then(() => { console.log ('Delete toys succeed !')})
    .catch((err) => { console.log ('Delete toys failed !')});
  
    res.redirect('toy1/index');
})
router.get('/drop', async(req, res) => {
    await Toy1Models.deleteMany({})
    .then(() => { console.log ('Delete all toys succeed !')});
    
    res.redirect('/');
})

//---------------------------------------------------Not Fixed------------------------------------------ (fixed but bugs)

router.post('/order_confirm', async (req, res) => {
    var id = req.body.id;
    var toy = await Toy1Models.findById(id);
    var order_quantity = req.body.order_quantity;
    var price = req.body.price;
    var total_price = price * order_quantity;
    res.render('toy1/order_confirm', { toy: toy, order_quantity : order_quantity, total_price : total_price});
})
// router.get('/add', (req, res) => {
//     res.render('toy/add');
//   })
// router.post('/add', async (req, res) => {
//     var toy = req.body;
//     await ToyModels.create(toy)
//     .then(() => { console.log ('Add new toy succeed !')});
//     res.redirect('/toy');
//   })
router.get('/add', (req, res) => {
    res.render('toy1/add');
  })
  
  router.post('/add', async (req, res) => {
    var toy = req.body;
    await Toy1Models.create(toy)
      .then(() => { console.log('Add new toy succeed !') });
    res.redirect('/toy1');
  })

  router.get('/edit/:id', async (req, res) => {
    var toy = await Toy1Models.findById(req.params.id);
     res.render('toy1/edit', { toy:toy});
  })
  router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    await Toy1Models.findByIdAndUpdate(id, {
       name: req.body.name, brand: req.body.brand,price: req.body.price,   type: req.body.type, quantity: req.body.quantity,
        image: req.body.image
    })
       .then(() => { console.log('Edit toy succeed!') });
    res.redirect('/toy1');
 })

// router.post('/edit/:id', async (req, res) => {
//     var id = req.params.id;
//     var updatedData = req.body; // Assuming the updated data is available in the request body

//     await ToyModels.findByIdAndUpdate(id, updatedData)
//         .then(() => { console.log('Edit figure succeed !') });
//     res.redirect('/toy');
// })

 
module.exports = router;