import { GET_RECIPES, GET_DIETS, SEARCH_RECIPES_BY_NAME, FILTER_BY,
    ORDER_BY,
    GET_RECIPE_DETAIL, POST_RECIPE} from './actions-types'

const initialState = {
    recipes: [],
    diets: [],
    filteredRecipes: [],
    recipeDetail: [],
    postedRecipes: []
}

const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_RECIPES:
            return {...state, recipes: action.payload, filteredRecipes: action.payload}
        case GET_RECIPE_DETAIL:
            return {...state, recipeDetail: action.payload}
        case GET_DIETS:
            return {...state, diets: action.payload};
        case POST_RECIPE:
            return {...state, postedRecipes: state.postedRecipes.concat(action.payload)};
        case SEARCH_RECIPES_BY_NAME:
            return {...state, filteredRecipes: action.payload}
        case FILTER_BY:
            const {source, diets} = action.payload;
            const filterRecipes = state.recipes && state.recipes
            .filter(recipe=> {
                if (
                    (
                        source === "Any" || 
                        (source === "Api" && !isNaN(recipe.id)) || //es un numero
                        (source === "DB" && isNaN(recipe.id))) 
                    && diets.every(diet => recipe.diets && recipe.diets.includes(diet))
                  ) return recipe})
        return {...state, filteredRecipes: filterRecipes}
            case ORDER_BY:
                const { by, form } = action.payload;
                let orderedRecipes = [...state.filteredRecipes];
    
                if (by === "alpha") {
                    if (form === "az") {
                        orderedRecipes.sort((a, b) => (a.name < b.name ? -1 : 1));
                    } else if (form === "za"){
                        orderedRecipes.sort((a, b) => (a.name < b.name ? 1 : -1));
                    }
                } else {
                    if (form === "higher"){
                        orderedRecipes.sort((a, b) => (b.healthScore - a.healthScore));
                    } else if (form === "lower"){
                        orderedRecipes.sort((a, b) => (a.healthScore - b.healthScore));
                    }
                }
                return {...state, filteredRecipes: orderedRecipes}
            default:
                return {...state};
            
    }
}

export default rootReducer