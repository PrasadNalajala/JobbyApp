import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

import {ImSearch} from 'react-icons/im'
import EmploymentTypesList from '../EmploymentTypesList'

import SalaryRangesList from '../SalaryRangesList'

import JobItem from '../JobItem'

import Navbar from '../Navbar'

// import SalaryRangesList from '../SalaryRangesList'

class Jobs extends Component {
  state = {
    name: '',
    profileUrl: '',
    bio: '',
    jobs: [],
    totalJobs: 0,
    searchInput: '',
    selectedSalaryRange: '',
    employmentTypesSelected: [],
    isJobsLoading: true,
    isProfileLoading: true,
    isFetchError: false,
    isProfileFetchError: false,
  }

  componentDidMount() {
    this.fetchProfile()
    this.fetchJobs()
  }

  onclickHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  onChangeEmploymentTypes = selected => {
    this.setState({employmentTypesSelected: selected})
    this.fetchJobs()
  }

  onChangeSalaryRange = selected => {
    console.log(selected)
    this.setState({selectedSalaryRange: selected})
    this.fetchJobs()
  }

  fetchJobs = async () => {
    const jwt = Cookies.get('jwt_token')
    this.setState({isJobsLoading: true})
    const {
      employmentTypesSelected,
      selectedSalaryRange,
      searchInput,
    } = this.state
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesSelected.join(
      ',',
    )}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      this.setState({
        jobs: data.jobs,
        totalJobs: data.total,
        isJobsLoading: false,
        isFetchError: false,
      })
    } else {
      this.setState({
        jobs: [],
        isJobsLoading: false,
        totalJobs: 0,
        isFetchError: true,
      })
    }
  }

  fetchProfile = async () => {
    this.setState({isProfileLoading: true})
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
    if (response.ok) {
      this.setState({
        name: data.profile_details.name,
        profileUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
        isProfileLoading: false,
        isProfileFetchError: false,
      })
    } else {
      this.setState({
        isProfileFetchError: true,
        isProfileLoading: false,
      })
    }
    // console.log(data.profile_details.name)
  }

  onEnterSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {
      name,
      profileUrl,
      bio,
      jobs,
      totalJobs,
      isJobsLoading,
      isFetchError,
      isProfileLoading,
      isProfileFetchError,
    } = this.state
    console.log(jobs)

    //  console.log(employmentTypesList)
    return (
      <div className="jobs-bg">
        <div className="nav">
          <div>
            <img
              onClick={this.onclickHome}
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="logo"
              className="logo"
            />
          </div>
          <div className="jobs-link-container">
            <h1 className="link" onClick={this.onclickHome}>
              Home
            </h1>
            <h1 className="link">Jobs</h1>
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
        <div className="jobs-card">
          <div className="search-container-sm">
            <input
              type="text"
              placeholder="Search"
              className="search"
              onChange={this.onEnterSearchInput}
            />
            <ImSearch className="search-icon" onClick={this.fetchJobs} />
          </div>
          <div className="profile-section">
            <div className="profile-container">
              {!isProfileLoading ? (
                <>
                  {!isProfileFetchError ? (
                    <>
                      <img src={profileUrl} alt="profile" className="profile" />
                      <h1 className="name">{name}</h1>
                      <p className="bio">{bio}</p>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="retry-btn profile-retry"
                        onClick={this.fetchProfile}
                      >
                        Retry
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div
                  className="loader-container"
                  id="login-loader profile-loader"
                >
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              )}
            </div>
            <hr />
            <EmploymentTypesList
              onChangeEmploymentTypes={this.onChangeEmploymentTypes}
            />
            <hr />
            <SalaryRangesList onChangeSalaryRange={this.onChangeSalaryRange} />
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search"
                className="search"
                onChange={this.onEnterSearchInput}
              />
              <ImSearch className="search-icon" onClick={this.fetchJobs} />
            </div>
            {!isJobsLoading ? (
              <>
                {!isFetchError ? (
                  <>
                    {jobs.map(each => (
                      <JobItem jobItem={each} key={each.id} />
                    ))}
                  </>
                ) : (
                  <div className="Notfound-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                      alt="failure view"
                    />
                    <h1>Oops! Something Went Wrong</h1>
                    <p className="notfound-p">
                      We cannot seem to find the page you are looking for
                    </p>
                    <button
                      type="button"
                      className="retry-btn"
                      onClick={this.fetchJobs}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="loader-container" id="login-loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
