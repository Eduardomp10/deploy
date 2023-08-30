import { Link } from "react-router-dom";
import styles from "./NavBar.module.css"
import { useLocation } from "react-router-dom"
import spidermanLogo from '../../assets/spidermanLogo.png'
import spiderNavbar from '../../assets/spiderNavbar.png'
import spidermanChef from '../../assets/spideyChef.jpg'



const NavBar = () => {
    const location = useLocation().pathname

    const locationDetector = (button) =>{
        if (button === location) return styles.buttonPressed;
        return styles.button;
    }

    return(
        <div className={styles.navBar}>
            <img src={spidermanLogo} alt="spidermanLogo" className={styles.spideyLogo}/>
            {/* <img src={spidermanChef} alt="spidermanChef" className={styles.spideyChef}/> */}

            <div className={styles.linkDiv}>
                <Link to="/home"><button className={styles.button}>Recipe list</button></Link>
                <Link to="/create"><button className={styles.button}>Create your recipe</button></Link>
            </div>
            {location==="/home" && <p className={styles.navBarPhrase}>Click one recipe to learn more about the dish!</p>}
            {location==="/create" && <p className={styles.navBarPhrase}>Show us how to make something new:</p>}
            {location.includes("/detail") && <p className={styles.navBarPhrase}>Here's everything you need to know about the dish:</p>}
        </div>
    )
}

export default NavBar;

