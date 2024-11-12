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

// Sample Solution, simpler way

// const Statistics = ({ good, neutral, bad}) => {
//   const total = good+bad+neutral

//   if ( total === 0) {
//     return (
//       <div>
//         <h2>Statistics</h2>
//         <div>no feedback given</div>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h2>Statistics</h2>
//       <table>
//         <tbody>
//           <StatisticLine label="good" value={good} />
//           <StatisticLine label="neutral" value={neutral} />
//           <StatisticLine label="bad" value={bad} />
//           <StatisticLine label="all" value={good + neutral + bad} />
//           <StatisticLine label="average" value={(good - bad) / total} />
//           <StatisticLine label="positive" value={(100 * good) / total + ' %'} />
//         </tbody>
//       </table>
//     </div>
//   )
// }

// const App = () => {
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   return (
//     <div>
//       <h2>Give feedback</h2>
//       <div>
//         <button onClick={() => setGood(good + 1)}>good</button>
//         <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
//         <button onClick={() => setBad(bad + 1)}>bad</button>
//       </div>
//       <Statistics good={good} neutral={neutral} bad={bad}/>
//     </div>
//   )
// }