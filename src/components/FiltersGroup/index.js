import './index.css'

const FiltersGroup = ({
  onChangeTypeOfEmployement,
  onChangeSalaryRange,
  activeEmployeeTypeId,
  activePackageId,
}) => {
  const onClickEmployementChange = id => {
    onChangeTypeOfEmployement(id)
  }

  const onClickSalaryRangeChange = id => {
    onChangeSalaryRange(id)
  }

  const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]

  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]

  const isEmploymentTypeChecked = id => id === activeEmployeeTypeId
  const isSalaryRangeChecked = id => id === activePackageId

  const renderEmployeeCategoriesList = () => (
    <ul className="categories-list">
      {employmentTypesList.map(category => (
        <li key={category.employmentTypeId}>
          <label htmlFor={`employeetype-${category.employmentTypeId}`}>
            <input
              type="checkbox"
              name="employmentType"
              id={`employeetype-${category.employmentTypeId}`}
              checked={isEmploymentTypeChecked(category.employmentTypeId)}
              onChange={() =>
                onClickEmployementChange(category.employmentTypeId)
              }
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
          <label htmlFor={`salary-${range.salaryRangeId}`}>
            <input
              type="radio"
              name="salaryRange"
              id={`salary-${range.salaryRangeId}`}
              checked={isSalaryRangeChecked(range.salaryRangeId)}
              onChange={() => onClickSalaryRangeChange(range.salaryRangeId)}
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
  const {onChangeTypeOfEmployement, onChangeSalaryRange} = props

  const onClickEmployementChange = id => {
    onChangeTypeOfEmployement(id)
  }

  const onClickSalaryRangeChange = id => {
    onChangeSalaryRange(id)
  }

  const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]

  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]

  const renderEmployeeCategoriesList = () => (
    <ul className="categories-list">
      {employmentTypesList.map(category => (
        <li key={category.employmentTypeId}>
          <label htmlFor={`employeetype-${category.employmentTypeId}`}>
            <input
              type="checkbox"
              name="employmentType"
              id={`employeetype-${category.employmentTypeId}`}
              value={category.employmentTypeId}
              onChange={() =>
                onClickEmployementChange(category.employmentTypeId)
              }
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
          <label htmlFor={`salary-${range.salaryRangeId}`}>
            <input
              type="radio"
              name="salaryRange"
              id={`salary-${range.salaryRangeId}`}
              value={range.salaryRangeId}
              onChange={() => onClickSalaryRangeChange(range.salaryRangeId)}
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
