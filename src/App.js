import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'


const App = () => {
  //state is Immutable so you can't do something like tasks.push().  Its one way data.  For this case you will use setTAsks
  //EX) setTasks([...tasks, {}])
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true
    },
    {
        id: 2,
        text: 'Dentist appointment',
        day: 'Feb 6th at 2:30pm',
        reminder: true
    }
  ])
  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
