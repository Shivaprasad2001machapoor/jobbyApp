import {Component} from 'react'
import {IoMdStar} from 'react-icons/io'
import {FaMapMarker, FaBriefcase} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'
import Header from '../Header'

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

  renderJobDetailSpecial = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      skills,
      lifeAtCompany,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="jobspecial-container">
        <Header />
        <div>
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
            <h1>{title}</h1>
            <div className="description-head-container">
              <h1 className="descri-head">Description</h1>
              <div className="desc-reight-container">
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </a>
              </div>
            </div>
            <h1 className="descri-head">Description</h1>
            <p className="job-desc-text">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1>skills</h1>
            <ul className="skill-seter">
              {skills.map(skill => (
                <li key={skill.name} className="skill-set">
                  <img src={skill.image_url} alt={skill.name} />
                  <p>{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-of-employees">
            <h1>Life at Company</h1>
            <div className="life-at-company">
              <p>{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.image_url} alt="life at company" />
            </div>
          </div>
        </div>

        <div className="similar-job-container">
          <h1>Similar Jobs</h1>
          <ul className="jobby-simi">
            {similarJobs.map(job => (
              <li key={job.id} className="similar-job-post">
                <img
                  src={job.companyLogoUrl}
                  alt="similar job company logo"
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
                <hr />
                <div className="desc">
                  <h1 className="descri-head">Description</h1>
                  <p className="job-desc-text">{job.jobDescription}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul>
            <p>helo</p>
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailSpecial()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
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
