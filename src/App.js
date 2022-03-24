import './App.css';
import Buscador from './Component/Buscador';
import Lista from './Component/Lista';
import Datos from './Component/Datos';
import React,{useState} from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import MostrarPeople from './Component/MostrarPeople';

function App() {

  const [url,setUrl] = useState("");
  const [datos,setDatos] = useState([]);

  return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/">
            <div className='formulario'>
              <Lista setUrl={setUrl}/>
              <Buscador setDatos={setDatos} url={url}/>
            </div>
            
            <Datos datos={datos}/>
        </Route>
        <Route exact path="/:id" render={(routeProps) => <MostrarPeople {...routeProps} />} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
