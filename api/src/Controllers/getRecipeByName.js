const axios = require('axios');
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;
const URL = 'https://api.spoonacular.com/recipes/complexSearch?';
//implementar source, utilizar sw
const getRecipeByName = async (req, res) => {
    try {
        let { name } = req.query;
        console.log('Puto angel');
        
        // if (!name) {
        //     return res.status(400).json({ message: 'Name parameter is required' });
        // }
        if (name === ''){
            console.log('perro');
           const allrecipesDB = await Recipe.findAll({include: [
            {
              model: Diets,
              attributes: ['name'],
              through: { attributes: [] } //Esto es para que no incluya los datos de la tabla intermedia
            }
          ]});
          const allrecipesDBFormated = allrecipesDB.map(recipe=> ({
                name: recipe.name,
                id: recipe.id,
                image: recipe.image,
                healthScore: recipe.healthScore,
                diets: recipe.diets.map(diet=> diet.name)
          }))
           const recipesApi = (await axios(`${URL}apiKey=${API_KEY}&number=100&addRecipeInformation=true`)).data.results
           if (recipesApi.length > 0) {
            const mapRecipes = recipesApi.map(recipe => ({
                name: recipe.title,
                id: recipe.id,
                image: recipe.image,
                healthScore: recipe.healthScore,
                diets: recipe.diets
            }));

            return res.status(200).json([...allrecipesDBFormated, ...mapRecipes])
        } else {
            return res.status(404).json({ message: 'No recipessss found with the given name' });
        }
        
        }
        else {

        // Traer todas las recetas de la base de datos
        const allRecipesFromDB = await Recipe.findAll();
        console.log(allRecipesFromDB);
        // Filtrar las recetas que coinciden con el nombre
        const filteredRecipes = allRecipesFromDB.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        // console.log(filteredRecipes);
            // Si no se encontraron recetas en la base de datos, buscar en la API externa
            const recipes = (await axios(`${URL}apiKey=${API_KEY}&number=100&addRecipeInformation=true`)).data;
            
            const filteredRecipesFromAPI = recipes.results.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));

            
                const mappedRecipes = filteredRecipesFromAPI.map(recipe => ({
                    name: recipe.title,
                    id: recipe.id,
                    image: recipe.image,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore
                }));

                return res.status(200).json([...filteredRecipes, ...mappedRecipes])
             
            
        }
    } catch (error) {
        console.error('Error fetching recipe from database:', error);
        return res.status(500).json({ error: 'Error fetching recipe from database' });
    }
};

module.exports = { getRecipeByName };


