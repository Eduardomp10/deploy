const { Router } = require('express');
const {getRecipeById} = require('../Controllers/getRecipeById')
const {getRecipeByName} = require('../Controllers/getRecipeByName');
const { getAllDiets } = require('../Controllers/getDiets');
const { getDietsToDb} = require('../Controllers/getDiets');
const { postRecipe } = require('../Controllers/postRecipe');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
getDietsToDb();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/recipes', getRecipeByName)
router.get('/recipes/name', getRecipeByName);
//http://localhost:3001/recipes/2
router.get('/recipes/:id', getRecipeById);
router.get('/diets', getAllDiets);
router.post('/recipes', postRecipe);





module.exports = router;
