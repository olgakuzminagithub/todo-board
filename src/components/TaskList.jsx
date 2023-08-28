import Task from "./Task";
import PropTypes from "prop-types";

const TaskList = ({status, tasks, toggleTask, deleteTask, changeTitle, changeDescription}) => {
    let classForTitle = "tasks";
    if (status === "done") {
        classForTitle += " tasks__comlated"
    }
    return (
        <div className={classForTitle}>
            <h2 className="tasks_title">{status.toUpperCase()} list</h2>
            <ul className="tasks_list"> 
                {tasks.filter((task => task.status === status))
                    .map((task) => (
                        <Task 
                            key={task.id} 
                            task={task} 
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                            changeTitle={changeTitle}
                            changeDescription={changeDescription}
                        />
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
}

TaskList.defaultProps = {
    tasks: [],
}

export default TaskList