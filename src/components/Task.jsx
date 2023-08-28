import { AiOutlineCheck, AiFillDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { useState, useRef } from "react";

const Task = ({ task, toggleTask, deleteTask, changeTitle, changeDescription}) => {
    const refTitle = useRef(null);
    const [editTitle, setEditTitle] = useState(false)
    const [title, setTitle] = useState(task.title);
    const refDes = useRef(null);
    const [editDescription, setEditDescription] = useState(false)
    const [description, setDescription] = useState(task.description);

    const handleTitleClick = (e) => {
        if (e.detail === 2) {
            setEditTitle(true)
            refTitle.current.focus();
        }
    }

    const handleTitleBlur = () => {
        if (!title.trim().length) {
            alert("Enter task");
            return
        }
        changeTitle(task.id, title)
        setEditTitle(false)
    }

    const handleDesClick = (e) => {
        if (e.detail === 2) {
            setEditDescription(true)
            refDes.current.focus();
        }
    }

    const handleDesBlur = () => {
        changeDescription(task.id, description)
        setEditDescription(false)
    }

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
            <div className="task_title">
                <p 
                    className={(editTitle === false) ? "text-show" : "text-notshow"}
                    onClick={handleTitleClick}
                >
                    {title}
                </p>
                <input
                    className={(editTitle === true) ? "input-show" : "input-notshow"}
                    type="text"
                    name="title"
                    value={title}
                    ref={refTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                />
            </div>
            <div className="task_description">
                <p 
                    className={(editDescription === false) ? "text-show" : "text-notshow"}
                    onClick={handleDesClick}
                >
                    {description}
                </p>
                <input
                    className={(editDescription === true) ? "input-show" : "input-notshow"}
                    type="text"
                    name="description"
                    value={description}
                    ref={refDes}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleDesBlur}
                />
            </div>
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