import './index.css'
import {IoMdStar} from 'react-icons/io'
import {FaMapMarker, FaBriefcase} from 'react-icons/fa'

const JobsItemDetails = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <div className="job-container">
      <div className="header">
        <img
          src={companyLogoUrl}
          alt={jobDescription}
          className="company-logo"
        />
        <div className="desc">
          <h1 className="role">{title}</h1>
          <div className="star-rating">
            <IoMdStar />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location">
        <div className="local">
          <div className="location-icon">
            <FaMapMarker />
            <p className="location-desc">{location}</p>
          </div>
          <div className="job-company">
            <FaBriefcase />
            <p className="employee-type">{employmentType}</p>
          </div>
        </div>
        <p>{packagePerAnnum}</p>
      </div>
      <hr />
      <div className="desc">
        <h1 className="descri-head">Description</h1>
        <p className="job-desc-text">{jobDescription}</p>
      </div>
    </div>
  )
}
export default JobsItemDetails
