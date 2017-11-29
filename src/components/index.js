import React, {Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ListNotes from './ListNotes'
import {logout} from '../helpers/auth'
import {firebaseAuth} from '../firebase'

function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => authed === true
      ? <Component {...props}/>
      : <Redirect to={{
        pathname: '/login',
        state: {
          from: props.location
        }
      }}/>}/>
  )
}

function PublicRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) => authed === false
      ? <Component {...props}/>
      : <Redirect to='/notes'/>}/>
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true
  }
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true, loading: false})
      } else {
        this.setState({authed: false, loading: false})
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    return this.state.loading === true
      ? <h1>Loading</h1>
      : (
        <BrowserRouter>
          <div>
            <div class="top-bar">
              <div class="top-bar-left">
                <ul class="menu">
                  <li>
                    <a href="/" class="menu-text">ReactNotes</a>
                  </li>
                </ul>
              </div>
              <div class="top-bar-right">
                {this.state.authed
                  ? <ul class="menu">
                      <li>
                        <a onClick={() => {
                          logout()
                        }}>Logout</a>
                      </li>
                    </ul>
                  : <ul class="menu">
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </ul>}
              </div>
            </div>
            <Switch>
              <Route path='/' exact component={Home}/>
              <PublicRoute authed={this.state.authed} path='/login' component={Login}/>
              <PublicRoute authed={this.state.authed} path='/register' component={Register}/>
              <PrivateRoute authed={this.state.authed} path='/notes' component={ListNotes}/>
              <Route render={() => <h3>No Match</h3>}/>
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}
