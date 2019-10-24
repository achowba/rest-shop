const mongoose = require('mongoose');

// create a schema for the product model
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema); // export model name and schema alongside
