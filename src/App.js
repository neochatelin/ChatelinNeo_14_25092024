import { Route, Routes } from 'react-router-dom';
import './App.css';
import Liste from './pages/Liste';
import { createContext, useState } from 'react';
import Home from './pages/Home';

export const Context = createContext();

function App() {
  const [list, setList] = useState([]);

  return (
    <div className="App">
      <Context.Provider value={[list, setList]}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/list' element={<Liste/>}/>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
