import { AiOutlineCheck, AiFillDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import EditField from "./EditField";

const Task = ({ task, toggleTask, deleteTask, changeTitle, changeDescription}) => {
    return (
    <li 
        className="tasks_item task" 
        // draggable={true}
        // onDragStart={e => dragStartHandler(e, task)}
        // onDragEnd={e => dragEndHandler(e)}
        // onDragLeave={e => dragLeaveHandler(e)}
        // onDragOver={e => dragOverHandler(e)}
        // onDrop={e => dropHandler(e, task)}

    >
        <div className="task_view-info">
            <EditField 
                taskID={task.id} 
                sourceText={task.title} 
                changeTextFunc={changeTitle} 
                addClass="task_title" 
                necessarily={true}
            />
            <EditField 
                taskID={task.id} 
                sourceText={task.description} 
                changeTextFunc={changeDescription} 
                necessarily={false}
            />
        </div>
        <div className="task_buttons">
            <div className="task_button task_button__check" onClick={() => toggleTask(task.id)}>
                <AiOutlineCheck/>
            </div>
            <div className="task_button task_button__delete" onClick={() => deleteTask(task.id)}>
                <AiFillDelete/>
            </div>
        </div>
    </li>
    )
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,

    }).isRequired,
    toggleTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    changeTitle: PropTypes.func.isRequired,
}

export default Task