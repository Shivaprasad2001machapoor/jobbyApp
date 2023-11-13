import {Component} from 'react'
import {IoMdStar} from 'react-icons/io'
import {FaMapMarker, FaBriefcase} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobSpecialization extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {id} = match.params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    try {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const responseData = await response.json()

        this.setState({
          jobDetails: {
            companyLogoUrl: responseData.job_details.company_logo_url,
            companyWebsiteUrl: responseData.job_details.company_website_url,
            employmentType: responseData.job_details.employment_type,
            id: responseData.job_details.id,
            jobDescription: responseData.job_details.job_description,
            skills: responseData.job_details.skills,
            lifeAtCompany: responseData.job_details.life_at_company,
            location: responseData.job_details.location,
            packagePerAnnum: responseData.job_details.package_per_annum,
            rating: responseData.job_details.rating,
          },
          similarJobs: responseData.similar_jobs.map(job => ({
            companyLogoUrl: job.company_logo_url,
            employmentType: job.employment_type,
            id: job.id,
            jobDescription: job.job_description,
            location: job.location,
            rating: job.rating,
            title: job.title,
          })),
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching job data:', error)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {apiStatus, jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      skills,
      packagePerAnnum,
      rating,
    } = jobDetails
    console.log(skills)
    if (apiStatus === apiStatusConstants.inProgress) {
      return <div>Loading...</div>
    }

    return (
      <div className="jobspecial-container">
        <div>
          <img
            src={companyLogoUrl}
            alt="Company Logo"
            className="company-logo"
          />
          <div className="desc">
            <div className="star-rating">
              <IoMdStar />
              <p className="rating">{rating}</p>
            </div>
          </div>
          <p>{employmentType}</p>
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
          <div className="skills-container">
            <h1>skills</h1>
            {skills.map(eachSkill => (
              <div className="skill-set">
                <img
                  src={eachSkill.img_url}
                  alt={eachSkill.name}
                  className="skilllogo"
                />
              </div>
            ))}
          </div>
          <div className="life-of-employees">
            <h1>life at corporate</h1>
          </div>
        </div>

        <div className="similar-job-container">
          <h1>Similar Jobs</h1>
          <div className="jobby-simi">
            {similarJobs.map(job => (
              <div key={job.id} className="similar-job-post">
                <img
                  src={job.companyLogoUrl}
                  alt="Company Logo"
                  className="company-logo"
                />
                <div className="desc">
                  <h1 className="role">{job.title}</h1>
                  <div className="star-rating">
                    <IoMdStar />
                    <p className="rating">{job.rating}</p>
                  </div>
                </div>
                <p>{job.employmentType}</p>
                <div className="location">
                  <div className="local">
                    <div className="location-icon">
                      <FaMapMarker />
                      <p className="location-desc">{job.location}</p>
                    </div>
                    <div className="job-company">
                      <FaBriefcase />
                      <p className="employee-type">{job.employmentType}</p>
                    </div>
                  </div>
                  <p>{job.packagePerAnnum}</p>
                </div>
                <p>{job.employmentType}</p>
                <hr />
                <div className="desc">
                  <h1 className="descri-head">Description</h1>
                  <p className="job-desc-text">{job.jobDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(JobSpecialization)

/*

 <Link to={`/jobs/${id}`} className="job-container">
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
    </Link>

import {Component} from 'react'
import Cookies from 'js-cookie' // Import Cookies library for token handling
import {withRouter} from 'react-router-dom' // Import withRouter for access to match prop
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobSpecialization extends Component {
  state = {
    jobData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    return (
      <div className="jobspecial-container">
        <h1>hello</h1>
      </div>
    )
  }
}

export default withRouter(JobSpecialization)
 */
