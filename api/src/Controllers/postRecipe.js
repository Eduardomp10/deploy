const axios = require('axios');
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;

const postRecipe = async (req, res) => {
  try {
    const { name, summary, image, healthScore, steps, diets } = req.body;
    console.log(req.body);
      if (!name || !summary) {
      return res.status(400).json({ message: 'Name or summary are missing' });
    }
    
    const newRecipeDb = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
    });
    console.log(newRecipeDb);

    if (diets && diets.length > 0) {
      // Assuming 'diets' is an array of diet names
      const dietRecords = await Diets.bulkCreate(
        diets.map((diet) => ({ name: diet }))
      );

      // Associate the created diets with the new recipe
      await newRecipeDb.setDiets(dietRecords);
    }
    // let response = {
    //   ...newRecipeDb.daValues,
    //   diets : diets
    // }
    return res.status(201).json( req.body );
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  postRecipe,
};


