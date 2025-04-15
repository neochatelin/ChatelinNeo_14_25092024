import { Route, Routes } from 'react-router-dom';
import './App.css';
import Liste from './pages/Liste';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Liste/>}/>
        </Routes>
    </div>
  );
}

export default App;
