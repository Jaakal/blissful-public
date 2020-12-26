import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './css/reset.css';
import './css/App.css';

import Navbar from './components/layout/Navbar'
import Alert from './components/error/Alert'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import Massages from './components/massages/Massages'
import Massage from './components/massages/Massage'

import { loadUser } from './actions/auth'

const stripePromise = loadStripe('YOUR STRIPE PUBLIC KEY');

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}> 
      <Router>
        <Elements stripe={stripePromise}>
          <Navbar/>
          <Alert/>
          <Switch>
            <Route path='/massages/:slug' component={Massage}/>
            <Route path='/massages' component={Massages}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path="/"
                render={() => {
                    return (
                      localStorage.token ?
                      <Redirect to="/dashboard" /> :
                      <Redirect to="/massages" /> 
                    )
                }}
              />
          </Switch>
        </Elements>
      </Router>
    </Provider>
  );
}

export default App;
