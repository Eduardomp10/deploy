import './App.css';
import  LandingPage  from './views/LandingPage/LandingPage'
import Home from './views/Home/Home'
import { Route, useLocation,  } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Detail from './views/Detailed/Detail';
import Form from './views/Form/Form';

function App() {
  const location = useLocation().pathname;
  return (
    <div className="App">
      {location!=="/"&&<NavBar/>}
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route path='/home'>
        <Home/>
      </Route>
      <Route path='/detail/:id'>
        <Detail/>
      </Route>
      <Route path='/create'>
        <Form/>
      </Route>
      






    </div>
  );
}

export default App;
