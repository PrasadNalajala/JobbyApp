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
  state = {selectedEmploymentTypes: []}

  handleEmploymentTypes = event => {
    const {id, checked} = event.target
    const {onChangeEmploymentTypes} = this.props
    const {selectedEmploymentTypes} = this.state
    let updatedEmploymentTypes
    this.setState(
      prevState => {
        if (checked) {
          updatedEmploymentTypes = [...prevState.selectedEmploymentTypes, id]
        } else {
          updatedEmploymentTypes = prevState.selectedEmploymentTypes.filter(
            value => value !== id,
          )
        }
        return {selectedEmploymentTypes: updatedEmploymentTypes}
      },
      () => {
        // Use the variable inside the callback function
        onChangeEmploymentTypes(updatedEmploymentTypes)
      },
    )
  }

  render() {
    // console.log(selectedEmploymentTypes.join(','))
    // console.log(this.state)
    return (
      <div>
        <h1 className="emp-type">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <div className="employment-sec" key={each.employmentTypeId}>
            <input
              className="checkbox"
              type="checkbox"
              id={each.employmentTypeId}
              onChange={this.handleEmploymentTypes}
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
