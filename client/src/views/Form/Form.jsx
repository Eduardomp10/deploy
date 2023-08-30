import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { postRecipe, getDiets } from "../../redux/actions";
import styles from "./Form.module.css"; // Ajusta la ruta según tu estructura
import validate from "./Validate";

const Form = () => {
    const dispatch = useDispatch();
    
    const diets = useSelector((state) => state.diets)
    const [recipe, setRecipe] = useState({
        name: '',
        image: '',
        summary: '',
        healthScore: '',
        steps: [],
        diets: []
    });
    useEffect(() => {
        dispatch(getDiets());
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validar el formulario antes de enviar
        const validationErrors = validate(recipe);
        setErrors(validationErrors);

        // Verificar si hay errores de validación
        if (Object.keys(validationErrors).length === 0) {
            // No hay errores de validación, enviar la solicitud
            try {
                await dispatch(postRecipe(recipe));
                // Si llegas aquí, la solicitud se envió correctamente
                // Puedes realizar acciones adicionales, como redireccionar o mostrar un mensaje de éxito
            } catch (error) {
                console.log('Valio madre');
                // Si hay un error en la solicitud (error de servidor), no necesitas hacer nada aquí
                // Tu acción "postRecipe" ya maneja el error y muestra una alerta
            }
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newValue = (name === 'steps' || name=== 'diets') ? value.split(',').map(element => element.trim()): value

        setRecipe({...recipe, [name]: newValue})
    };
    const [errors, setErrors] = useState({
        name: ''
      });

      const changeHandler = (event) => {
        const { name, checked } = event.target;
        let { value } = event.target;

        if (name === "diets") {
            if (checked) {
              setRecipe({
                ...recipe,
                diets: [...recipe.diets, value],
              });
            } else {
              setRecipe({
                ...recipe,
                diets: recipe.diets.filter((diet) => diet !== value),
              });
            }
    setErrors(validate({
        ...recipe,
        [name]: value,
      }));
    }
}
      return (
        <div className={styles.container}>
          <div className={styles.formContainer}>
            
            <form onSubmit={handleSubmit} className={styles.recipeForm}>
            <h2>Create a New Recipe</h2>
                <div className={styles.inputName}>
                    <h4>Write the recipe name:</h4>
                <input
                    type="text"
                    name="name"
                    value={recipe.name}
                    onChange={handleInputChange}
                    placeholder="Recipe Name"
                    className={styles.inputField}
                    />
                </div>
                {errors.name && <span className={styles.errorSpan}>{errors.name}</span>}
                <div className={styles.inputImage}>
                    <h4>Image URL:</h4>
                <input
                    type="text"
                    name="image"
                    value={recipe.image}
                    placeholder='Put the URL of the photo'
                    onChange={handleInputChange}
                    className={styles.inputImage}
                />
                </div>
                {errors.image && <span className={styles.errorSpan}>{errors.image}</span>}
                <div className={styles.inputSummary}>
                    <h4>Write your summary:</h4>
                <input
                    type="text"
                    name="summary"
                    value={recipe.summary}
                    onChange={handleInputChange}
                    placeholder="Summary"
                    className={styles.inputField}
                    />
                </div>
                {errors.summary && <span className={styles.errorSpan}>{errors.summary}</span>}
                <div className={styles.inputHealthScore}>
                <h4>Set the healthScore:</h4>
                <input
                    type="number"
                    name="healthScore"
                    value={recipe.healthScore}
                    onChange={handleInputChange}
                    placeholder="Health Score"
                    className={styles.inputField}
                    />
                </div>
                {errors.healthScore && <span className={styles.errorSpan}>{errors.healthScore}</span>}
                <div className={styles.inputSteps}>
                <h4>Steps for cook magic:</h4>
                <input 
                type="text"
                name="steps"
                value={recipe.steps}
                onChange={handleInputChange}
                placeholder="put the steps separated by ','"
                className={styles.steps}
                />
                </div>
                {errors.steps && <span className={styles.datSpan}>{errors.steps}</span>}
                <div className={styles.diets}>
        <p>Select the diets associated with your dish:</p>
        <fieldset className={styles.checkboxFieldset}>
          {diets?.map((diet) => (
            <label key={diet}className={styles.checkbox} >
        
              <input
                id={diet + "Check"}
                type="checkbox"
                name="diets"
                value={diet}
                onChange={changeHandler}
                checked={recipe.diets.includes(diet)}
              />
              {(diet.charAt(0).toUpperCase() + diet.slice(1)).split(" ").join("-")}
            </label>
          ))}
        </fieldset>
        {errors.diets && <span className={styles.spanRari}>{errors.diets}</span>}
        <button type="submit" className={styles.submitButton}>Create Recipe</button>
        
      </div>
      
      

            </form>
        </div>
        </div>
    );
}
    
    
    export default Form;
    
    
    