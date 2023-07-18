import {Component} from 'react'

import Cookies from 'js-cookie'

class Jobs extends Component {
  state = {name: '', profileUrl: '', bio: '', jobs: [], totalJobs: 0}

  componentDidMount() {
    this.fetchProfile()
  }

  fetchProfile = async () => {
    const jwt = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(jwt, data)
  }

  render() {
    return (
      <div className="jobs-bg">
        <div className="nav">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="logo"
              className="logo"
            />
          </div>
          <div className="jobs-link-container">
            <h1 className="link">Home</h1>
            <h1 className="link">Jobs</h1>
          </div>
          <div>
            <button type="button" className="logout-btn">
              Logout
            </button>
          </div>
        </div>
        <div>
          <div>
            <h1>hiii</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
