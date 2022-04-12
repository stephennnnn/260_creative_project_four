const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true
});

// create new recipe
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    recipeName: req.body.recipeName,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    notes: req.body.notes,
    path: req.body.path,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for grandma's recipes
const recipeSchema = new mongoose.Schema({
  recipeName: String,
  ingredients: String,
  instructions: String,
  notes: String,
  path: String,
});
// Create a model for grandma's recipes
const Recipe = mongoose.model('Recipe', recipeSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Get a list of all of grandma's recipes
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// delete recipe from database.
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.long(error);
    res.sendStatus(500);
  }
});

// edit recipe in database.
app.put('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id
    });
    recipe.recipeName = req.body.recipeName;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;
    recipe.notes = req.body.notes;
    await recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.long(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
