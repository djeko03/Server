const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: true},
})

module.exports = model('Product', ProductSchema)