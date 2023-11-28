import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./Components/Home";
import CreateList from "./Components/CreateList";
import OpenList from "./Components/OpenList";
import logo from "./images/Logo.png";
import "./Style-sheets/App.css";

function App() {
  return (
    <Router>
      <div>
        <div className='logo-container'>
          <Link to="/">
            <img src={logo} alt="Logo" className='logo' />
          </Link>
        </div>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-list" component={CreateList} />
          <Route path="/open-list/:listName" component={OpenList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
