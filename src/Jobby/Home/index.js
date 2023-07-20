import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  onclickFindJobs = () => {
    const {history} = this.props
    // const jwt = Cookies.get('jwt_token')
    //  console.log(jwt)
    history.push('/jobs')
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="home-bg">
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
            <h1 className="link" onClick={this.onclickFindJobs}>
              Jobs
            </h1>
          </div>
          <div>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="card">
          <h1 className="heading">Find the job that fits your life</h1>
          <p className="description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential
          </p>
          <button
            type="button"
            className="find-jobs-btn"
            onClick={this.onclickFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
