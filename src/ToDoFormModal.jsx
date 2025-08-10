import axios from "axios"
import Home from "./Home"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { userContext } from "./userContext";
import React from "react";
import ErrorModal from "./ErrorModal";

function ToDoFormModal ({ onClose, onUpdate, _title="", _description="", _due_date="", id=0}) {

    const [error, setError] = useState(false)
    const {user, setUser} =  React.useContext(userContext)
    const api_url = process.env.REACT_APP_API_URL
    const [title, setTitle] = useState(_title)
    const [description, setDescription] = useState(_description)
    const [due_date, setDueDate] = useState(_due_date)
    const navigate = useNavigate()

    const closeError = () => {
        setError(false)
    }

    const submitForm = (e) => {
        e.preventDefault()

        const data = {
            "title": title,
            "description": description,
            "due_time": due_date,
            "user_id": user.id,
        }

        if (id == 0) {
            axios.post(api_url + "/todos/", data,
                {
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                }
            ).catch((res) => {
                setError(true)
            }).then((res) => {  
                onUpdate()
            })
            onClose()
        } else {
            axios.get(api_url + "/todos/" + id, {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            }).then((res) => {
                axios.put(api_url + "/todos/" + id, {...res.data, ...data},
                    {
                        headers: {
                            "Authorization": "Bearer " + user.token
                        }
                    }
                ).catch((res) => {
                    console.log("API ERROR")
                    setError(true)
                }).then((res) => {
                    onUpdate()
                })
                onClose()
            })
        }
    }

    return (
        <>
            <div className="modal_overlay"></div>
            <div className="login_container" id="form_container">
                <h1>New task</h1>
                <form className="login_form">
                    <label htmlFor="task_title"><bold>Task title</bold></label>
                    <input value={title} type="task_title" name="task_title" id="task_title" className="text_input" onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="task_description"><bold>Task description</bold></label>
                    <textarea value={description} type="task_description" name="task_description" id="task_description" className="text_area" onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="due_date"><bold>Due date</bold></label>
                    <input value={due_date} type="datetime-local" name="due_date" id="due_date" className="" onChange={(e) => setDueDate(e.target.value)}/>
                    <button onClick={onClose} id="big_cancel_btn">Cancel</button>
                    <button id="submit_btn" onClick={submitForm}>{id === 0 ? "Add this task" : "Edit"}</button>
                </form>
            </div>
            { error && <ErrorModal onClose={closeError}/> }
        </>
    )
}

export default ToDoFormModal;
