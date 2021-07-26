const mongoose = require('mongoose')


const mealSchema = new mongoose.Schema({
    onDay: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    food: [{foodItem: String, portionSize: Number, kcal: Number, _id: mongoose.Types.ObjectId}]

})

const Meal = mongoose.model('Meal', mealSchema)

module.exports = {
    Meal
}