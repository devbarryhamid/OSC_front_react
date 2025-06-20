import Acceuil from './pages/Acceuil';
import Formation from './pages/formation';
import MesFormations from './pages/Voirtesformation';
import {Routes,Route,BrowserRouter } from 'react-router-dom';

const App = ()=>{
  return(
    <div>
    <BrowserRouter >
        <Routes>
          <Route path="/" element = {<Acceuil/>}></Route>
          <Route path="/formations" element = {<Formation/>}></Route>
          <Route path="/mesformations" element = {<MesFormations/>}></Route>
          </Routes>
      </BrowserRouter >
    </div>
  )
};

export default  App;