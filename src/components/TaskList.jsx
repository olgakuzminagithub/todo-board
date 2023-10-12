import Task from "./Task";
import PropTypes from "prop-types";
import { useState } from "react";

const TaskList = ({status, tasks, toggleTask, deleteTask, changeTitle, changeDescription, changeStatus}) => {
    //change title for 
    let classForTitle = "tasks";
    if (status === "done") {
        classForTitle += " tasks__comlated"
    }

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
        console.log('task', task.title, 'dropIndex', dropIndex)
        const currentIndex = tasks.indexOf(currnentTask);
        console.log('currentTask', currnentTask.title, 'currentIndex', currentIndex)
        if (currentIndex >= 0) {
            tasks.splice(currentIndex, 1);
            tasks.splice(dropIndex, 0, currnentTask);
            changeStatus(currnentTask.id, task.status);
        } 
        if (e.target.className === 'tasks_item task') {
            e.target.style.boxShadow = 'none';
        }
    }

    function dragOverBoardHandler (e) {
        e.preventDefault()
    }

    function dragLeaveBoardHandler (e) {
   
    }

    function dropBoardHandler(e, status) {
        e.preventDefault()
        //console.log('hi', status)
        //changeStatus(currnentTask.id, status);
    }



    
    return (
        <div 
            className={classForTitle}
            onDragOver={e => dragOverBoardHandler(e)}
            onDragLeave={e => dragLeaveBoardHandler(e)}
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
    )}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    toggleTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    changeTitle: PropTypes.func.isRequired,
    changeDescription: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
    tasks: [],
}

export default TaskList