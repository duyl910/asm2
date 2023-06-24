var mongoose = require('mongoose')
var Toy1New = mongoose.Schema({
    name: String,
    type: String,
    brand: String,
    quantity: Number,
    price: Number,
    image: String,
    
});
var Toy1Models= mongoose.model("ToyStore1", Toy1New, "Toy1")
module.exports = Toy1Models;
