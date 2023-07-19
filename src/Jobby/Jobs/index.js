import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

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
    this.setState({
      name: data.profile_details.name,
      profileUrl: data.profile_details.profile_image_url,
      bio: data.profile_details.short_bio,
    })
    // console.log(data.profile_details.name)
  }

  render() {
    const {name, profileUrl, bio} = this.state
    // console.log(this.state)
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
        <div className="jobs-card">
          <div className="profile-section">
            <div className="profile-container">
              <img src={profileUrl} alt="profile" className="profile" />
              <h1 className="name">{name}</h1>
              <p className="bio">{bio}</p>
            </div>
            <hr />
          </div>
          <div>
            <h1>nwii</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
