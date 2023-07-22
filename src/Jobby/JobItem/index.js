import './index.css'
import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

// import {MdOutlineWork} from 'react-icons/md'
// import {from} from 'array-flatten'

const JobItem = props => {
  const {jobItem} = props
  return (
    <Link to={`/jobs/${jobItem.id}`} className="job-container">
      <div className="logo-container">
        <img
          src={jobItem.company_logo_url}
          alt="company logo"
          className="logo"
        />
        <div className="role-container">
          <h1 className="role">{jobItem.title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{jobItem.rating}</p>
          </div>
        </div>
      </div>
      <div className="details">
        <div className="location-container">
          <IoLocationSharp />
          <p className="location">{jobItem.location}</p>
          <FaSuitcase />
          <p className="employment-type">{jobItem.employment_type}</p>
        </div>
        <h1 className="package">{jobItem.package_per_annum}</h1>
      </div>
      <hr />
      <h1 className="description-title">Description</h1>
      <p>{jobItem.job_description}</p>
    </Link>
  )
}

export default JobItem
