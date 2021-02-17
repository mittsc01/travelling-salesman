import './App.css';
import React, { useState,useEffect} from 'react'
import EditMap from './EditMap';
import Schedule from './Schedule'
import {Link, Route, Switch} from 'react-router-dom'
import Map from './Map'
import RouteList from './RouteList';
import About from './About'
import AddScheduleItem from './AddScheduleItem'
import TokenService from './services/token-service'
import AuthApiService from './services/auth-api-service'
import IdleService from './services/idle-service'
import PrivateRoute from './utils/PrivateRoute'
import PublicOnlyRoute from './utils/PublicOnlyRoute'
import LoginForm from './login-form'
import RegistrationForm from './RegistrationForm'
import RaceContext from './RaceContext';

class App extends React.Component {
  state = {
    login: false
  }
  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }
  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }

  handleLogin = () => {
    this.forceUpdate()
  }
  handleLogout = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.forceUpdate()
  
    
  }
  handleRegister = () => {
    this.props.history.push('/login')
  }

render(){
  const contextValue = {
    login: this.state.login,
    handleLogin: this.handleLogin,
    handleLogout: this.handleLogout,

  }
  return (
    <div className="main">
      <header>
        <Link to='/'>About</Link>
        {!TokenService.hasAuthToken()
          && <Link to="/login">Login</Link>
          }
          {!TokenService.hasAuthToken()
          && <Link to="/register">Register</Link>
          }
        <Link to='/routes'>Routes</Link>
        <Link to='/schedule'>Schedule</Link>
        {TokenService.hasAuthToken()
          && <Link onClick={this.handleLogout} to="/">Logout</Link>
          }
        
      </header>
      <RaceContext.Provider value={contextValue}>
        <Route exact path='/login' component={LoginForm} />
      </RaceContext.Provider>
      <Route exact path='/register' component={RegistrationForm} />
      <Route exact path="/" component={About}/>
      <Route exact path='/routes' component={RouteList} />
      <Route path="/routes/add" component={EditMap} />
      <Route path="/routes/:id" component={EditMap} />
      <Route exact path="/schedule" component={Schedule} />
      
      <Route exact path="/schedule/:id" component={Map} />
      <Route path="/schedule/:id/edit" component={EditMap} />
      <Route exact path="/add-to-schedule" component={AddScheduleItem} />
     
      
      
      
      
    </div>
  );}
}

export default App;