const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part, id) => <Part key={id} part={part}/>)}
  </>

const Course = ({course}) => {
  const sum = course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={sum}/>
  </>
}

export default Course