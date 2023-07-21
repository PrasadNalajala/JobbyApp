import {Component} from 'react'

import './index.css'

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

class SalaryRangesList extends Component {
  state = {selectedSalary: ''}

  handleSalaryRange = event => {
    this.setState({selectedSalary: event.target.value}, () =>
      this.handleSalaryRange1(),
    )
  }

  handleSalaryRange1 = () => {
    const {onChangeSalaryRange} = this.props
    const {selectedSalary} = this.state
    // console.log(selectedSalary)
    onChangeSalaryRange(selectedSalary)
  }

  render() {
    // const {selectedSalary} = this.state
    return (
      <div>
        <h1 className="emp-type">Salary Range</h1>
        {salaryRangesList.map(each => (
          <div className="employment-sec" key={each.salaryRangeId}>
            <input
              className="checkbox"
              type="radio"
              name="salaryRange"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={this.handleSalaryRange}
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

export default SalaryRangesList
