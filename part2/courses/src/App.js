const Course = ({courses}) =>{

  function coursesDestruct(course){
    const parts = course.parts.map((part, i) => <div key = {i}>{part.name} {part.exercises}</div>)
    const exercises = course.parts.reduce((sum,part) => sum + part.exercises, 0)
    return(
      <div>
        <h2>{course.name}</h2>
        {parts}
        Total exercises = {exercises}
      </div>
    )
  }
  const course_list = courses.map((course) => coursesDestruct(course))
  return(
    <div>
      {course_list}
    </div>
  )
}



const App = () => {
  const courses = [{
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }]
  return <Course courses={courses} />
}

export default App