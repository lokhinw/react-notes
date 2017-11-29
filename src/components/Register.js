import React, {Component} from 'react'
import {auth} from '../helpers/auth'

function setErrorMsg(error) {
  return {registerError: error.message}
}
export default class Register extends Component {
  state = {
    registerError: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value).catch(e => this.setState(setErrorMsg(e)))
  }
  render() {
    return (
      <div class="grid-x form-box">
        <div class="small-10 medium-6 large-4">
          <div class="top">
            <h1>Register</h1>
          </div>
          <div class="bottom">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="email" className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw}/>
              </div>
              {this.state.registerError && <div className="alert alert-danger text-center" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.registerError}
              </div>}
              <div className="form-group">
                <button type="submit" className="button">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
