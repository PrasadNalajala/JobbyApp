import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Login extends Component {
  state = {username: 'rahul', password: 'rahul@2021', errorMsg: '', isLoading: false}

  componentDidMount() {
    const jwt = Cookies.get('jwt_token')
    // console.log(jwt)
    if (jwt !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  onClickLogin = () => {
    this.onLogin()
  }

  onLogin = async () => {
    const {username, password} = this.state
    const req = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(req),
    }
    this.setState({isLoading: true})
    const response = await fetch('https://apis.ccbp.in/login', options)
    const jwtToken = await response.json()

    // console.log(jwtToken.jwt_token)
    if (response.ok === true) {
      // console.log('h')
      const {history} = this.props

      Cookies.set('jwt_token', jwtToken.jwt_token, {expires: 30})
      history.replace('/')
      this.setState({isLoading: false})
      const jwt = Cookies.get('jwt_token')

      // console.log(jwt)
    } else {
      this.setState({
        username: '',
        isLoading: false,
        password: '',
        errorMsg: '*Username and Password Did Not Matched',
      })
    }
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, isLoading} = this.state
    return (
      <div className="login-bg">
        <div className="login-card">
          <div className="logo-container" id="login-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="logo"
              className="logo"
            />
          </div>
          {!isLoading ? (
            <>
              <label htmlFor="username">USERNAME</label>

              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={this.onchangeUsername}
                value='rahul'
              />

              <label htmlFor="password">PASSWORD</label>

              <input
                type="password"
                id="password"
                placeholder="Password"
                value='rahul@2021'
                onChange={this.onchangePassword}
              />
              <br />
              <button
                type="button"
                className="login-btn"
                onClick={this.onClickLogin}
              >
                Login
              </button>
              <p className="error-msg">{errorMsg}</p>
            </>
          ) : (
            <div className="loader-container" id="login-loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Login
