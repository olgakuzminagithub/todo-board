import {useState} from 'react'
import TaskForm from "./components/TaskForm";
import Task from './components/Task';

const taskStatuses = ['todo', 'done' ];

function App() {
  const [tasks, setTasks] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);

  //add new task function
  const addTask = task => setTasks((t) => [...t, task]);

  
  // function that toggles a flag done ore not done
  const toggleTask = id => setTasks((tasks) => 
    tasks.map(t => {
      if ((t.id === id) && (t.status === "todo")) return {...t, status: "done" } 
      if ((t.id === id) && (t.status === "done")) return {...t, status: "todo"}
      else return t
    }
  ))

  // change Title
  const changeTitle = (id, newTitle) => setTasks((tasks) => 
    tasks.map( (t) => t.id === id ? {...t, title: newTitle} : t)
  )

  // change deskription
  const changeDescription = (id, newDes) => setTasks((tasks) => 
      tasks.map( (t) => t.id === id ? {...t, description: newDes} : t)
  )

  //change status
  const changeStatus = (id, newStatus) => setTasks((tasks) => 
    tasks.map( (t) => t.id === id ? {...t, status: newStatus} : t)
  )


  //delete task function
  const deleteTask = id => setTasks((tasks) => tasks.filter((t) => t.id !== id))

  // add task to local storage
  localStorage.setItem('todos', JSON.stringify(tasks))

   //darg and drops
   const[currnentTask, setCurrentTask] = useState(null);
  
   function dragStartHandler (e, task) {
       setCurrentTask(task);
   }

   function dragOverHandler(e) {
       e.preventDefault()
       if (e.target.className === 'tasks_item task') {
           e.target.style.boxShadow = '0 2px 3px gray';
       }
   }

   function dragEndHandler(e) {
       if (e.target.className === 'tasks_item task') {
           e.target.style.boxShadow = 'none';
       }
   }

   function dragLeaveHandler (e) {
       if (e.target.className === 'tasks_item task') {
           e.target.style.boxShadow = 'none';
       }
   }

   function dropHandler(e, task) {
       e.preventDefault()
       const dropIndex = tasks.indexOf(task)
       const currentIndex = tasks.indexOf(currnentTask);
       tasks.splice(currentIndex, 1);
       tasks.splice(dropIndex, 0, currnentTask);
       changeStatus(currnentTask.id, task.status);
       if (e.target.className === 'tasks_item task') {
           e.target.style.boxShadow = 'none';
       }
       e.stopPropagation()
   }

   function dragOverBoardHandler(e) {
    e.preventDefault()
    if (e.target.className === 'tasks') {
        e.target.style.boxShadow = '0 2px 3px gray';
    }
   }

   function dropBoardHandler(e, status) {
      e.preventDefault()
      changeStatus(currnentTask.id, status);
      if (e.target.className === 'tasks') {
        e.target.style.boxShadow = 'none';
    }

  }


  return (
    <div className="body">
      <div className="container">
        <h1 className="title">Todo List App</h1>
        <TaskForm addTask={addTask}/>
        <div className="row">
          {taskStatuses.map((status) => (
            <div 
              className="tasks"
              onDragOver={e => dragOverBoardHandler(e)}
              onDrop={e => dropBoardHandler(e, status)}
            >
                 <h2 className="tasks_title">{status.toUpperCase()} list</h2>
                 <ul className="tasks_list"> 
                     {tasks.filter((task => task.status === status))
                         .map((task) => (
                             <li 
                                 key={task.id} 
                                 className="tasks_item task" 
                                 draggable={true}
                                 onDragStart={e => dragStartHandler(e, task)}
                                 onDragLeave={e => dragLeaveHandler(e)}
                                 onDragEnd={e => dragEndHandler(e)}
                                 onDragOver={e => dragOverHandler(e)}
                                 onDrop={e => dropHandler(e, task)}
                             >
                                 <Task 
                                     task={task} 
                                     toggleTask={toggleTask}
                                     deleteTask={deleteTask}
                                     changeTitle={changeTitle}
                                     changeDescription={changeDescription}
                                 />
                             </li>
                     ))}
                 </ul>
             </div>
          ))
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;

