import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import {FaSuitcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import SimilarJob from '../SimilarJob'
import Navbar from '../Navbar'

class JobItemDetails extends Component {
  state = {jobItem: {}, isLoading: true, similarJobs: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  onclickFindJobs = () => {
    const {history} = this.props
    // const jwt = Cookies.get('jwt_token')
    // console.log(jwt)
    history.push('/jobs')
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  getJobItemDetails = async () => {
    const jwt = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(id, data)
    this.setState({
      jobItem: data,
      isLoading: false,
      similarJobs: data.similar_jobs,
    })
  }

  onClickHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {jobItem, isLoading, similarJobs} = this.state
    const jobDetails = jobItem.job_details
    console.log(similarJobs)
    return (
      <div className="job-details-bg">
        <div className="nav">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="logo"
              className="logo"
              onClick={this.onclickFindJobs}
            />
          </div>
          <div className="jobs-link-container">
            <h1 className="link" onClick={this.onClickHome}>
              Home
            </h1>
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
        <Navbar className="nav-sm" />

        {isLoading ? (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <div className="job-details-container">
            <div className="job-container">
              <div className="logo-container">
                <img
                  src={jobDetails.company_logo_url}
                  alt="job details company logo"
                  className="logo"
                />
                <div className="role-container">
                  <h1 className="role">{jobDetails.title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="star" />
                    <p className="rating">{jobDetails.rating}</p>
                  </div>
                </div>
              </div>
              <div className="details">
                <div className="location-container">
                  <IoLocationSharp />
                  <p className="location">{jobDetails.location}</p>
                  <FaSuitcase />
                  <p className="employment-type">
                    {jobDetails.employment_type}
                  </p>
                </div>
                <h1 className="package">{jobDetails.package_per_annum}</h1>
              </div>
              <hr />
              <div className="description-container ">
                <h1 className="description-title">Description</h1>
                <a href={jobDetails.company_website_url} className="visit-link">
                  <p className="visit">Visit</p>
                  <FiExternalLink />
                </a>
              </div>
              <p>{jobDetails.job_description}</p>
              <h1 className="skills-h1"> Skills</h1>
              <div className="skills-section">
                {jobDetails.skills.map(each => (
                  <div className="skill-container" key={each.name}>
                    <img
                      alt={each.name}
                      src={each.image_url}
                      className="skill-img"
                    />
                    <p className="skill-name">{each.name}</p>
                  </div>
                ))}
              </div>
              <h1 className="skills-h1">Life at Company</h1>
              <div className="life-at-company">
                <p className="company-desc">
                  {jobDetails.life_at_company.description}
                </p>
                <img
                  src={jobDetails.life_at_company.image_url}
                  className="cmpny-life-url"
                  alt="life at company"
                />
              </div>
            </div>
            <h1 className="description-title">Similar Jobs</h1>
            <div className="similar-job-container">
              {similarJobs.map(each => (
                <SimilarJob similarJob={each} key={each.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default JobItemDetails
