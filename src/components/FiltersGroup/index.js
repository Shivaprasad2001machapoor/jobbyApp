import './index.css'

const FiltersGroup = props => {
  const renderEmployeeCategoriesList = () => {
    const {employmentTypesList} = props
    return <h1>helo</h1>
  }
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
/* <div className="profile-container">
        <h1 className="name">Rahul</h1>
        <p>Senior Software Developer</p>
      </div>
      <hr />
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
