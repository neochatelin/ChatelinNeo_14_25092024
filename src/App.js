import { Route, Routes } from 'react-router-dom';
import './App.css';
import Liste from './pages/Liste';
import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

function App() {
  const [list, setList] = useState([]);

  return (
    <div className="App">
      <Context.Provider value={[list, setList]}>
        <Routes>
          <Route path='/' element={<Liste/>}/>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
