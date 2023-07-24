import './index.css'

import {AiFillHome} from 'react-icons/ai'

import {FaSuitcase} from 'react-icons/fa'

import {IoLogOutOutline} from 'react-icons/io5'

import {Cookies} from 'js-cookie'

const Navbar = props => {
  const onclickFindJobs = () => {
    const {history} = props
    // const jwt = Cookies.get('jwt_token')
    //  console.log(jwt)
    history.push('/jobs')
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="nav-sm">
      <div className="nav-logo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="logo"
          className="logo-sm"
          onClick={onClickHome}
        />
      </div>
      <div className="jobs-link-container">
        <AiFillHome onClick={onClickHome} className="nav-link-sm" />
        <FaSuitcase onClick={onclickFindJobs} className="nav-link-sm" />
        <IoLogOutOutline onClick={onClickLogout} className="nav-link-sm" />
      </div>
    </div>
  )
}

export default Navbar
