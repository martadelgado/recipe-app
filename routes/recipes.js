const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const Recipe = require('../models/recipe');

// Get All Recipes
router.get('/', (req, res) => {
  Recipe.find({}, (err, recipes) => {
    if (err) throw err;
    return res.json(recipes);
  });
});

// Get one Recipe
router.get('/:id', (req, res, next) => {
  var recipeId = req.params.id;
  Recipe.findById({ _id: recipeId }, function(err, recipe) {
    if (err) {
      res.send(err);
    } else {
      console.log("this recipe is ", recipe.id);
    return res.json(recipe);
    }
  });
});

// Add New Recipe
router.post('/add', (req, res, next) => {
  const newRecipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    description: req.body.description
  });
  console.log("title", req.body.title);

  if (!req.body.title || !req.body.ingredients || !req.body.description) {
    res.status(403).json({message: "please fill in all fields"});
    return;
  }
    newRecipe.save( (err) => {
      if (err) {
        res.status(400).json({message: err});
      } else {
        console.log("recipe", req.body.title);
        return res.json({ message: "New Recipe Created"});
      }
    });
});

// Delete Recipe
router.delete('/:id', (req, res, next) => {
  var recipeId = req.params.id;
  Recipe.remove({ _id: recipeId}, function(err, recipe) {
    if (err) {
      res.send(err);
    } else {
      return res.json(recipe);
    }
  });
});

module.exports = router;
