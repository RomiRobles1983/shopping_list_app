import React from 'react';
import "../Style-sheets/Prueba.css";
import { BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import Home from "./Home";
import CreateList from "./CreateList";
import OpenList from "./OpenList";

function Prueba() {
  return (
    <div>
      <div className="mi-componente">
        <h1>PRUEBA</h1>
        <p>Este es un ejemplo de prueba para media queries.</p>
      </div>

      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-list" component={CreateList} />
          <Route path="/open-list/:listName" component={OpenList} />
        </Switch>

        {/* Botones para navegar a CreateList y OpenList */}
        <div>
          <Link to="/create-list">
            <button>Ir a CreateList</button>
          </Link>
          
          <Link to="/open-list/list1">
            {/* Puedes ajustar el parámetro de la lista según tus necesidades */}
            <button>Ir a OpenList</button>
          </Link>
        </div>
      </Router>
    </div>
  );
}

export default Prueba;