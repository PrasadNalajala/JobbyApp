import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  componentDidMount() {
    const jwt = Cookies.get('jwt_token')
    console.log(jwt)
    if (jwt !== undefined) {
      const {history} = this.props
      history.push('/')
    }
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const req = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(req),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const jwtToken = await response.json()
    // console.log(response, jwtToken)
    if (response.ok === true) {
      const {history} = this.props
      history.replace('/')
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const jwt = Cookies.get('jwt_token')
      // console.log(jwt)
    }
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password} = this.state
    return (
      <div className="login-bg">
        <div className="login-card">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="logo"
              className="logo"
            />
          </div>
          <label htmlFor="username">USERNAME</label>

          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.onchangeUsername}
            value={username}
          />

          <label htmlFor="password">PASSWORD</label>

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={this.onchangePassword}
          />
          <br />
          <button type="button" className="login-btn" onClick={this.onLogin}>
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default Login
