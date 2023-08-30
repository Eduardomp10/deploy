
import { useEffect, useState } from "react";
import styles from "./Detail.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../redux/actions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import spideyChef from '../../assets/spideyChef.jpg';

const Detail = () => {
const dispatch = useDispatch();
const {id} = useParams()

    const { title, image, diets, summary, healthScore, steps}
    = useSelector(state=> state.recipeDetail)
    useEffect(() => {

        dispatch(getRecipeDetail(id))
    
      }, []);


    const textFormat = (diet) =>{
        return (diet[0].toUpperCase() + diet.slice(1)).split(" ").join("-")
    }


    return(
        <div className={styles.mainDiv}>
            <img src={spideyChef}className={styles.spideyChef} />
            <div className={styles.descriptionDiv}>
                <img src={image} alt={`imagen de ${title}`} className={styles.contentImage} />
                <div className={styles.hsDiv}>
                    <p className={styles.idP}>id# {id}</p>
                    <p className={styles.hsP}>Health score: {healthScore}</p>
                
                <p className={styles.title}>{title}</p>
                <p dangerouslySetInnerHTML={{__html: summary}} className={styles.description}></p>
                <div className={styles.dietDiv}>
                    <p className={styles.dietTitle}>Part of the following diets: &nbsp;
                    <p className={styles.dietList}>
                        {diets?.map(diet => <p className={styles.diet}>{textFormat(diet)}</p>)}
                    </p>
                    </p>
                
            
           
            </div>
            </div>
            <div className={styles.stepsDiv}>
                <p className={styles.stepsTitle}>Steps:</p>
                <ul>
                {steps?.map(step => (
                    <li className={styles.steps}>{step}</li>
                ))}
                </ul>
                </div>
            </div>
            
        </div>
    )
}

export default Detail