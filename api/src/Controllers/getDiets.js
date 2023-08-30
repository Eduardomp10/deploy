const axios = require('axios');
const { Diets } = require('../db');
const { set } = require('../app');
const { API_KEY } = process.env; 

const URL = 'https://api.spoonacular.com/recipes/complexSearch?';

const getDietsToDb = async () => {
  try {
    const dietsFromApi = (await axios(`${URL}apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;

// Obtener las dietas existentes en la base de datos
const existingDiets = await Diets.findAll();
const existingDietsSet = new Set(existingDiets.map(diet => diet.name));

const dietsForDbArray = [];

dietsFromApi.forEach((diet) => {
  if (diet.diets) {
    diet.diets.forEach((dietName) => {
      if (!existingDietsSet.has(dietName)) {
        existingDietsSet.add(dietName);
        dietsForDbArray.push({ name: dietName });
      }
    });
  }
});

if (dietsForDbArray.length > 0) {
  try {
    const createdDiets = await Diets.bulkCreate(dietsForDbArray, { ignoreDuplicates: true });
  } catch (error) {
    console.error("Error adding diets to the database:", error);
    throw new Error("Error adding diets to the database");
  }
}
  } catch (error) {
    console.error('Error fetching diets from API:', error);
    throw new Error('Error fetching diets from API');
  }
};







// Llama a la función para precargar las dietas al iniciar la aplicación


// Controlador para obtener todas las dietas
const getAllDiets = async (req, res) => {
    try {
        const dietsLoad = await Diets.findAll(); // Debes usar await aquí
        set(dietsLoad)
        return res.status(200).json(dietsLoad);
    } catch (error) {
        console.error('Error fetching diets from database:', error);
        return res.status(500).json({ error: 'Error fetching diets from database' });
    }
};

module.exports = { getAllDiets, getDietsToDb};



