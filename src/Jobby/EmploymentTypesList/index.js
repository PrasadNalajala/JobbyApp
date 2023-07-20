import './index.css'

import {Component} from 'react'

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

class EmploymentTypesList extends Component {
  render() {
    return (
      <div>
        <h1 className="emp-type">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <div className="employment-sec">
            <input
              className="checkbox"
              type="checkbox"
              id={each.employmentTypeId}
            />
            <label className="label" htmlFor={each.id}>
              {each.label}
            </label>
          </div>
        ))}
      </div>
    )
  }
}

export default EmploymentTypesList
