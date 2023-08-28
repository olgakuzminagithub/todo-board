import PropTypes from "prop-types";
import { useState, useRef } from "react";

const EditField = ({taskID, sourceText, changeTextFunc, addClass = "", necessarily = true}) => {
    const refText = useRef(null);
    const [editText, setEditText] = useState(false)
    const [text, setText] = useState(sourceText);

    const className = "task_field " + addClass;

    const handleTextClick = (e) => {
        if (e.detail === 2) {
            setEditText(true)
            refText.current.focus();
        }
    }

    const handleTextBlur = () => {
        if (necessarily && !text.trim().length) {
            alert("Enter task");
            return
        }
        changeTextFunc(taskID, text)
        setEditText(false)
    }

    return (
    <div className={className}>
    <p 
        className={(editText === false) ? "text-show" : "text-notshow"}
        onClick={handleTextClick}
    >
        {text}
    </p>
    <input
        className={(editText === true) ? "input-show" : "input-notshow"}
        type="text"
        value={text}
        ref={refText}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleTextBlur}
    />
</div>
    )
}

EditField.propTypes = {
    taskID: PropTypes.string.isRequired,
    sourceText: PropTypes.string.isRequired,
    changeTextFunc: PropTypes.func.isRequired,
}

export default EditField