import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
  )

const StatisticLine = ({value, text}) => {
  return (
    <tr>
    <td>{text}: </td>
    <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table><tbody>
      <StatisticLine value={props.good} text='good' />
      <StatisticLine value={props.neutral} text='neutral' />
      <StatisticLine value={props.bad} text='bad' />
      <StatisticLine value={props.all} text='all' />
      <StatisticLine value={props.average} text='average' />
      <StatisticLine value={props.positive} text='positive' />
    </tbody></table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage((updatedGood-bad)/updatedAll)
    setPositive(updatedGood/updatedAll*100 + '%')
  }
  const handleNeutral = () => {
    const updatedAll = all + 1
    setNeutral(neutral + 1)
    setAll(updatedAll)
    setAverage((good-bad)/updatedAll)
    setPositive(good/updatedAll*100  + '%')
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage((good-updatedBad)/updatedAll)
    setPositive(good/updatedAll*100 + '%')
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
        />
    </div>
  )
}

export default App