import './App.css';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Home';
import { useState } from 'react';
import { userContext } from './userContext';

function App() {
  const [user, setUser] = useState(null)
  
  return (
    <userContext.Provider value={{user, setUser}}>
      <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<RegisterBox/>}/>
            <Route path='/login' element={<LoginBox/>}/>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;
