import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardContainer from '../../Components/CardContainer/CardContainer'
import  SearchBar  from '../../Components/SearchBar/SearchBar'
import { getRecipes, getDiets } from "../../redux/actions";
import styles from "./Home.module.css"

const Home = () => {

    const dispatch = useDispatch();

    useEffect(()=>{//hacer lo que quiero hacer antes de arrancar
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch])

    return(
        <div className={styles.home}>
            <SearchBar />
            <CardContainer /> 
        </div>
    )
}

export default Home;