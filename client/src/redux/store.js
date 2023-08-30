import { createStore, applyMiddleware, compose } from 'redux'
// extension para el navegador
import thunkMiddleware from 'redux-thunk'//manejar asincronia
import rootReducer from './reducer'
// import {composeWithDevTools} from 'redux-devtools-extension'


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;