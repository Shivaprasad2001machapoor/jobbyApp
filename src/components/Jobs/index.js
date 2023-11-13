import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'
import JobsItemDetails from '../JobsItemDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmployeeTypeId: '',
    searchInput: '',
    activePackageId: '',
    profileData: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmployeeTypeId, searchInput, activePackageId} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeeTypeId}&minimum_package=${activePackageId}&search=${searchInput}`
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
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobs())
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsListView = () => {
    const {jobsList} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <input
          type="search"
          placeholder="Search"
          className="searchbar"
          value={this.searchInput}
          onChange={this.onChangeSearchInput}
        />
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobsItemDetails jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">Oops! Something Went Wrong</h1>
        <p className="no-products-description">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button">Retry</button>
      </div>
    )
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} className="profile-img" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeTypeOfEmployement = id => {
    const {activeEmployeeTypeId} = this.state
    this.setState((activeEmployeeTypeId: id))
  }

  onChangeSalaryRange = id => {
    const {activePackageId} = this.state
    this.setState((activePackageId: id))
  }

  render() {
    return (
      <div>
        <Header />
        <div className="all-jobs-section">
          <div className="filter-container">
            {this.renderProfile()}
            <FiltersGroup
              onChangeTypeOfEmployement={this.onChangeTypeOfEmployement}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
            <FiltersGroup
              activeEmployeeTypeId={this.activeEmployeeTypeId}
              activePackageId={this.activePackageId}
              onChangeTypeOfEmployement={this.onChangeTypeOfEmployement}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>
          <div className="output-section-container">
            {this.renderAllProducts()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
