import './App.css';
import Game from './compnents/game';
import HomeBox from './compnents/homeBox';
import LogIn from './compnents/logIn';
import Profile from './compnents/profile';
import Regis from './compnents/register';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { AuthProvider } from './compnents/auth';



function App() {

  return (
    <AuthProvider>
      <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<HomeBox/>}/>
          <Route exact path='/login' element={<LogIn/>}/>
          <Route exact path='/game' element={<Game/>}/>
          <Route exact path='/register' element={<Regis/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
