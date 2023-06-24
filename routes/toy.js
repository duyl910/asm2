var express = require('express');
const ToyModels= require('../Models/ToyModels');
var router = express.Router()

router.get('/', async(req, res)=>{
    var toys = await ToyModels.find({});
    var total = await ToyModels.count();
    res.render('toy/index', {toys: toys, total: total})
})
//Search function
router.post('/search', async(req , res)=>{
    var keyword = req.body.keyword;
    var toys = await ToyModels.find({name: new RegExp(keyword, "i")})
    res.render('toy/index', { toys: toys})
})
//Sort function
router.get('/ascending', async(req, res)=>{
    var toys = await ToyModels.find().sort({quantity: 1})
    res.render('toy/index', {toys: toys})
})
router.get('/descending', async(req, res)=>{
    var toys = await ToyModels.find().sort({quantity: -1})
    res.render('toy/index', {toys: toys})
})

router.get('/list', async (req, res) => {
    var toys = await ToyModels.find({});
    res.render('toy/list', { toys: toys });
})

router.get('/delete/:id', async(req, res) => {
    var id = req.params.id;
    // var mobile = await MobileModel.findById(id);
    // await MobileModel.deleteOne(mobile);
  
    await ToyModels.findByIdAndDelete(req.params.id)
    .then(() => { console.log ('Delete toys succeed !')})
    .catch((err) => { console.log ('Delete toys failed !')});
  
    res.redirect('/toy');
})
router.get('/drop', async(req, res) => {
    await ToyModels.deleteMany({})
    .then(() => { console.log ('Delete all toys succeed !')});
    
    res.redirect('/');
})

//---------------------------------------------------Not Fixed------------------------------------------ (fixed but bugs)

router.post('/order_confirm', async (req, res) => {
    var id = req.body.id;
    var toy = await ToyModels.findById(id);
    var order_quantity = req.body.order_quantity;
    var price = req.body.price;
    var total_price = price * order_quantity;
    res.render('toy/order_confirm', { toy: toy, order_quantity : order_quantity, total_price : total_price});
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
    res.render('toy/add');
  })
  
  router.post('/add', async (req, res) => {
    var toy = req.body;
    await ToyModels.create(toy)
      .then(() => { console.log('Add new toy succeed !') });
    res.redirect('/toy');
  })

  router.get('/edit/:id', async (req, res) => {
    var toy = await ToyModels.findById(req.params.id);
     res.render('toy/edit', { toy:toy});
  })
  router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    await ToyModels.findByIdAndUpdate(id, {
       name: req.body.name, brand: req.body.brand,price: req.body.price,   type: req.body.type, quantity: req.body.quantity,
        image: req.body.image
    })
       .then(() => { console.log('Edit toy succeed!') });
    res.redirect('/toy');
 })

// router.post('/edit/:id', async (req, res) => {
//     var id = req.params.id;
//     var updatedData = req.body; // Assuming the updated data is available in the request body

//     await ToyModels.findByIdAndUpdate(id, updatedData)
//         .then(() => { console.log('Edit figure succeed !') });
//     res.redirect('/toy');
// })

 
module.exports = router;