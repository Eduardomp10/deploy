const axios = require('axios');
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;

const URL = 'https://api.spoonacular.com/recipes';


    const getRecipeById = async (req, res) => {
        const { id } = req.params;
        console.log('Valentin');

        try {
            if (isNaN(id)) {
                const recipeIdDataBase = await Recipe.findOne({
                    where: { id: id },
                    include: Diets,
                });
                const mappedRecipeDataBase = {
                    ...recipeIdDataBase.toJSON(),
                    diets:recipeIdDataBase.diets.map((diet) => diet.name)
                }
                return res.json(mappedRecipeDataBase);
            } else {
                const recipes = (await axios(`${URL}/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)).data;
                // console.log(recipes);
                const { title, image, summary, healthScore, analyzedInstructions, diets } = recipes;
                const steps = analyzedInstructions[0].steps.map(step => step.step)
                console.log(steps);
                const recipeApi = {
                    id,
                    title,
                    image,
                    diets,
                    summary,
                    healthScore,
                    steps
                };
                return res.status(200).json(recipeApi);
            }
        } catch (error) {
            console.error('Error fetching recipe from database:', error);
            return res.status(500).json({ error: 'Error fetching recipe from database' });
        }
    };

    module.exports = { getRecipeById };





