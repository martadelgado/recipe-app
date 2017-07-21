const mongoose = require('mongoose');
// const config = require('../config/database');
const Schema   = mongoose.Schema;

const RecipeSchema = new Schema({
  title: String,
  ingredients: String,
  description: String
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
