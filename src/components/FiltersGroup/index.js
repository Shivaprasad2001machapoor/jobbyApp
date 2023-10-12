import './index.css'

const FiltersGroup = props => {
  const {employmentTypesList, salaryRangesList} = props

  const renderEmployeeCategoriesList = () => (
    <ul className="categories-list">
      {employmentTypesList.map(category => (
        <li key={category.employmentTypeId}>
          <label>
            <input
              type="checkbox"
              name="employmentType"
              value={category.employmentTypeId}
            />
            {category.label}
          </label>
        </li>
      ))}
    </ul>
  )

  const renderSalaryRangesList = () => (
    <ul className="salary-ranges-list">
      {salaryRangesList.map(range => (
        <li key={range.salaryRangeId}>
          <label>
            <input
              type="checkbox"
              name="salaryRange"
              value={range.salaryRangeId}
            />
            {range.label}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="filter-container">
      <hr />
      <h1 className="category-heading">Employee Type</h1>
      {renderEmployeeCategoriesList()}
      <h1 className="category-heading">Salary Range</h1>
      {renderSalaryRangesList()}
    </div>
  )
}

export default FiltersGroup

/* import './index.css'

const FiltersGroup = props => {
  const {employmentTypesList, salaryRangesList} = props
  const renderEmployeeCategoriesList = () => <h1>hello</h1>
  const renderEmpolyeeTypeFilter = () => (
    <>
      <h1 className="category-heading">Employee Type</h1>
      <ul className="categories-list">{renderEmployeeCategoriesList()}</ul>
    </>
  )

  return (
    <div className="filter-container">
      <hr />
      {renderEmpolyeeTypeFilter()}
    </div>
  )
}
export default FiltersGroup
 <div className="profile-container">
        <h1 className="name">Rahul</h1>
        <p>Senior Software Developer</p>
      </div>
      <hr />
      <<li>
        {employmentTypesList.map(eachEmployee => (
          <button type="button" className="button">
            {eachEmployee.label}
          </button>
        ))}
      </li>
      <div className="employment-type-container">
        <h1 className="head">Employeement Type</h1>
        <li>
        {employmentTypesList.map(eachEmployee => (
          <button className="button" type="button">
            {eachEmployee.label}
          </button>
        ))}
      </li>
        {employmentTypesList.map(eachEmployee => (
          <button className="button" type="button">
            {eachEmployee.label}
          </button>
        ))}
      </div> */
