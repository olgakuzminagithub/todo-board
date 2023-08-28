import {useState} from 'react'
import TaskList from './components/TaskList';
import TaskForm from "./components/TaskForm";

const taskStatuses = ['todo', 'done' ];

function App() {
  const [tasks, setTasks] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);

  //add new task function
  const addTask = task => setTasks((t) => [...t, task]);

  
  // function that toggles a flag done ore not done
  const toggleTask = id => setTasks((tasks) => 
    tasks.map( (t) => {
      if (t.id !== id) return t
      if ((t.id === id) && (t.status === "todo")) return {...t, status: "done" } 
      if ((t.id === id) && (t.status === "done")) return {...t, status: "todo"}
    }
  ))

  // change Title
  const changeTitle = (id, newTitle) => setTasks((tasks) => 
    tasks.map( (t) => t.id === id ? {...t, title: newTitle} : t)
  )

    // change Title
    const changeDescription = (id, newDes) => setTasks((tasks) => 
      tasks.map( (t) => t.id === id ? {...t, description: newDes} : t)
  )
  
  //delete task function
  const deleteTask = id => setTasks((tasks) => tasks.filter((t) => t.id !== id))

  // add task to local storage
  localStorage.setItem('todos', JSON.stringify(tasks))

  return (
    <div className="body">
      <div className="container">
        <h1 className="title">Todo List App</h1>
        <TaskForm addTask={addTask}/>
        <div className="row">
            {taskStatuses.map(status => (
                <TaskList 
                  key={status}
                  status={status}
                  tasks={tasks}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  changeTitle={changeTitle}
                  changeDescription={changeDescription}
                />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

