import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

const SimilarJob = props => {
  const {similarJob} = props
  return (
    <div className="job-container similar-job">
      <div className="logo-container">
        <img
          className="logo"
          src={similarJob.company_logo_url}
          alt="similar job company logo"
        />
        <div className="role-container">
          <h1 className="role">{similarJob.title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{similarJob.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="skills-h1">Description</h1>
      <p>{similarJob.job_description}</p>
      <div className="location-container">
        <IoLocationSharp />
        <p className="location">{similarJob.location}</p>
        <FaSuitcase />
        <p className="employment-type">{similarJob.employment_type}</p>
      </div>
    </div>
  )
}

export default SimilarJob
