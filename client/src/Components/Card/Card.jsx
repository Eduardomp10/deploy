import styles from "./Card.module.css"
import {Link} from "react-router-dom"

const Card = ({id, name, image, diets, healthScore}) => {
    
    const textFormat = (diet) =>{
        return (diet[0].toUpperCase() + diet.slice(1)).split(" ").join("-")
    }

    return(
        
            <div className={styles.mainDiv}>
                <Link to={`/detail/${id}`} className={styles.navLink}>
                <p className={styles.cardTitle}>{name}</p>
                </Link>
                <img className={styles.cardImg} src={image} alt={name} />
                <p className={styles.cardHealthscore}>Healthscore: {healthScore}</p>
                <div className={styles.cardDietTags}>
                    {diets &&
                        diets.map((diet, index) => (
                            <span key={index} className={styles.cardDietTag}>
                                {textFormat(diet)}
                            </span>
                        ))}
                </div>
            </div>
        
    )
}

export default Card;