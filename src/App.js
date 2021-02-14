import './App.css';
import React, { useState,useEffect} from 'react'
import EditMap from './EditMap';
import Schedule from './Schedule'
import {Link, Route, Switch} from 'react-router-dom'
import Map from './Map'
import RouteList from './RouteList';
import About from './About'

function App() {


  return (
    <div className="main">
      <header>
        <Link to='/'>About</Link>
        <Link to='/routes'>Routes</Link>
        <Link to='/schedule'>Schedule</Link>
        <Link to='/'>Logout</Link>
        
      </header>
      <Route exact path="/" component={About}/>
      <Route exact path='/routes' component={RouteList} />
      <Route path="/routes/add" component={EditMap} />
      <Route path="/routes/:id" component={EditMap} />
      <Route exact path="/schedule" component={Schedule} />
      <Switch>
      <Route path="/schedule/:id" component={Map} />
      <Route path="/schedule/:id/edit" component={EditMap} />
      <Route exact path="/schedule/add" component={EditMap} />
      </Switch>
      
      
      
      
    </div>
  );
}

export default App;