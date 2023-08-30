import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import spiderMan2099audio from '../../../src/assets/spiderMan2099.mp3'

const LandingPage = () => {

    useEffect(() => {
        const audio = new Audio(spiderMan2099audio);
        audio.play();

        return () => {
            audio.pause();
        };
    }, []);


    return(
        <div className={styles.mainDiv}>
        <div className={styles.titleDiv}>
            <div className={styles.Image}/>
            <h1 className={styles.title}>Are you ready for become a Spidey Chef?
            then, press let's go!</h1>
            
            <Link to='/home'>
            <button className={styles.startBtn}>
            let's go!
            </button>
            </Link>
            </div>
        </div>
    )
}

export default LandingPage;
