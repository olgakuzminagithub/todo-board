import {useState, useRef, useEffect} from 'react';
import { generate as id } from 'shortid';
import PropTypes from "prop-types";


const TaskForm = ({addTask}) => {
    const [showDescription, setShowDescription] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const wrapRef = useRef(null)

    const handleClick = (e) => {
        if(wrapRef.current && !wrapRef.current.contains(e.target)) {
            setShowDescription(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.addEventListener("mousedown", handleClick);
        }
    }, [])
   

    const handleFocusTitle = (e) => {
       setShowDescription(true)
    }

    // const handleBlurTitle = (e) => {
    //     setShowDescription(false)
    // }

    const handleChangeTitle = (e) => setTitle(e.target.value);

    const handleChangeDes = (e) => setDescription(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim().length) {
            alert("Enter task");
            return
        }
        const task = { id: id(), title: title, description: description, status: "todo"};
        addTask(task);  
        setTitle("");
        setDescription("");
        setShowDescription(false);
    }

    return (
    <div className="new-task">
        <form method="POST" className="new-task_form" onSubmit={handleSubmit} ref={wrapRef}>
            <div className="new-task_info">
                <input
                    className="new-task_input"
                    placeholder="Enter Task"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChangeTitle}
                    onFocus={handleFocusTitle}
                    //onBlur={handleBlurTitle}
                />
                <input
                    className={(showDescription === false) ? "new-task_textarea display-none" : "new-task_textarea display-block"}
                    placeholder="Enter description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChangeDes}
                />
            </div>
            <button className="new-task_button" type="submit">+ Add</button>
        </form>
     </div>
  )
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
}

export default TaskForm