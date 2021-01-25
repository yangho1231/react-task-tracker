import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter as Router, Route} from 'react-router-dom'



const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  //state is Immutable so you can't do something like tasks.push().  Its one way data.  For this case you will use setTAsks
  //EX) setTasks([...tasks, {}])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  //Fetch Tasks 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'Delete'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    console.log(taskToToggle)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  //Add Task
  const addTask = async (task) => {
    console.log(task)
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }
  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

        <Route path='/' exact render={(props) => (
          <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to Show'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>

  );
}

export default App;
