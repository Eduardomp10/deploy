import { GET_RECIPES, GET_DIETS, SEARCH_RECIPES_BY_NAME, FILTER_BY, ORDER_BY,GET_RECIPE_DETAIL, POST_RECIPE } from "./actions-types";
import axios from 'axios'
//Estas acciones devuelven un objeto con el tipo de accion que se quiere realizar y
//un payload que contiene la informacion
//{type, payload(information, data)}
export const getRecipes = () => {
   return async function(dispatch) {
      try {
         const recipes = (await axios.get(`http://localhost:3001/recipes/name?name=`)).data;
         // console.log(recipes);
         return dispatch({type: GET_RECIPES, payload: recipes});
     } catch (error) {
         alert(error.message)
         console.log(error.message);
     }
      
   }
}

export const getRecipeDetail = (id) =>{
   return async function(dispatch){
      
      try {
         const recipes = (await axios.get(`http://localhost:3001/recipes/${id}`)).data;
         if(recipes) {
         return dispatch({type: GET_RECIPE_DETAIL, payload: recipes});
      }
      
   } catch (error) {
         alert(error.message)
      }
}
}
 export const getDiets = () => {
    return async function(dispatch) {
      try {
         let diets = (await axios.get("http://localhost:3001/diets")).data
         diets = diets.map(diets=> diets.name)
         return dispatch({type: GET_DIETS, payload: diets})
      } catch (error) {
         alert(error.message)
      }
    }
   }
export const searchByName = (name) =>{
   return async function(dispatch){
      
      try {
         const recipes = (await axios.get(`http://localhost:3001/recipes/name?name=${name}`)).data;
         if(recipes) {
         return dispatch({type: SEARCH_RECIPES_BY_NAME, payload: recipes});
      }
      
   } catch (error) {
         alert(error.message)
      }
}
}
export const postRecipe = (recipe) =>{
   return async function(dispatch){
      
      try {
         const postedRecipe = (await axios.post(`http://localhost:3001/recipes`,recipe)).data;
         if(postedRecipe) {
         return dispatch({type: POST_RECIPE, payload: postedRecipe});
      }
      
   } catch (error) {
         alert(error.message)
      }
}
}

export const filterBy = (filter) =>{
   return function(dispatch){
       dispatch({type: FILTER_BY, payload: filter})
   }
}

export const orderBy = (order) =>{
   return function(dispatch){
       dispatch({type: ORDER_BY, payload: order})
   }
}