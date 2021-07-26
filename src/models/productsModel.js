const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    categories: Array,
    weight: Number,
    title: Object,
    calories: Number,
    groupBloodNotAllowed: Array
})

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product
}