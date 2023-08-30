import { useSelector, useDispatch } from "react-redux";
import styles from "./SearchBar.module.css"
import { useState, useEffect } from "react";
import { searchByName, filterBy, orderBy } from '../../redux/actions'

const SearchBar = () => {
    const dispatch = useDispatch();
    const diets = useSelector(state=>state.diets)

    const [search, setSearch] = useState('')

    const [filter, setFilter] =useState({
        source: 'Any',
        diets:[]
    })
    const [order, setOrder] = useState({
        by:'',
        form: ''
    })
    const searchChangeHandler = (event) => {
        const { value } = event.target; // Obtener el valor del campo de entrada
        setSearch(value); // Actualizar el estado local 'search' con el nuevo valor
    }
    
    const filterChangeHandler = (event) =>{
        const {name, value, type, checked} = event.target;
        console.log(value);
        if(type==="checkbox"){
            if(checked){
                setFilter({
                    ...filter,
                    diets: [...filter.diets, value]
                })
            } else {
                setFilter({
                    ...filter,
                    diets: filter.diets.filter(diet=>diet!==value)
                })
            }
        } else {
            setFilter({
                ...filter,
                [name]: value
            })
        }
    }

    const orderChangeHandler = (event) =>{
        const {name, value} = event.target
        
        setOrder({
            ...order,
            by: name,
            form: value
        })
    }
    
    useEffect(()=>{
        dispatch(searchByName(search));
    }, [search])

    useEffect(()=>{
        dispatch(filterBy(filter));
    }, [filter])

    useEffect(()=>{
        dispatch(orderBy(order));
    }, [order])


    return (
        <div className={styles.searchBar}>
            <div className={styles.searchDiv}>
                <p>Search for your recipe</p>
                <input type="text" name="search" value={search} onChange={searchChangeHandler} />
            </div>
            <div className={styles.filterDiv}>
                <p className={styles.filterBy}>Filter by:</p>
                <p className={styles.source}>source</p>
                <fieldset className={styles.fieldset}>
                <label><input checked id="anyRange" type="radio" name="source" value="Any" onChange={filterChangeHandler}/> Any</label>
                    <label><input id="apiRange" type="radio" name="source" value="Api" onChange={filterChangeHandler}/> Cookbook</label>
                    <label><input id="customRange" type="radio" name="source" value="DB" onChange={filterChangeHandler}/> Custom</label>
                </fieldset>
            </div>
            <div className={styles.diets}>
                <p className={styles.dietsP}>Diets:</p>
                <fieldset className={styles.checkboxFieldset}>
                    {/* fieldset es un campo, muchas cajitas pertenecen a la misma clase */}
                    {diets.map(diet => {
                        return (
                            <label key={diet}>
                                <input 
                                    className={styles.dietCheck}
                                    id={diet+"Check"} 
                                    type="checkbox" 
                                    name="diets"
                                    value={diet}
                                    onChange={filterChangeHandler}
                                    checked={filter.diets.includes(diet)}/>
                                {(diet.charAt(0).toUpperCase()+ diet.slice(1)).split(" ").join("-")}
                            </label>
                        )
                    })}
                </fieldset>
            </div>
            <div className={styles.filterDiv}>
                <p className={styles.orderP}>Order by:</p>
                <div>
                    <p>Alphabetically:</p>
                    <select name="alpha" id="alphaSelect" className={styles.select} onChange={orderChangeHandler}>
                        <option value="default">-</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
                <div>
                    <p>By HealthScore:</p>
                    <select name="healthScore" id="healthScoreSelect" className={styles.select} onChange={orderChangeHandler}>
                        <option value="default">-</option>
                        <option value="higher">Higher</option>
                        <option value="lower">Lower</option>
                    </select>
                </div>
            </div>
        </div>
        
        
        
    )
}



export default SearchBar