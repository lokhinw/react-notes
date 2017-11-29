import React, {Component} from 'react'
import {login, resetPassword} from '../helpers/auth'

function setErrorMsg(error) {
  return {loginMessage: error}
}

export default class Login extends Component {
  state = {
    loginMessage: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value).catch((error) => {
      this.setState(setErrorMsg('Invalid username/password.'))
    })
  }
  resetPassword = () => {
    resetPassword(this.email.value).then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`))).catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render() {
    return (
      <div class="grid-x form-box">
        <div class="small-10 medium-6 large-4">
          <div class="top">
            <h1>Login</h1>
          </div>
          <div class="bottom">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="email" className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw}/>
              </div>
              {this.state.loginMessage && <div className="alert alert-danger text-center" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.loginMessage}
                <a href="#" onClick={this.resetPassword} className="alert-link"> Forgot Password?</a>
              </div>}
              <div className="form-group">
                <button type="submit" className="button">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
