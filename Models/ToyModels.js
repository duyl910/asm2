var mongoose = require('mongoose')
var ToySchema = mongoose.Schema({
    name: String,
    type: String,
    brand: String,
    quantity: Number,
    price: Number,
    image: String
});
var ToyModels= mongoose.model("ToyStore", ToySchema, "Toys")
module.exports = ToyModels;