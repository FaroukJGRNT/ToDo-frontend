import trash from "./assets/Trash.png"
import edit from "./assets/Edit.png"
import { useState, useEffect, useRef } from "react";
import DeleteModal from "./DeleteModal";
import ToDoFormModal from "./ToDoFormModal";
import PropTypes from 'prop-types';
import axios from "axios";
import { userContext } from "./userContext";
import { useContext } from "react";
import React from "react";

const statuses = {
    "Not started": "todo",
    "In progress": "in progress",
    "Done": "done"
}

function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

function formatDateForMySQL(dateString) {
    if (!dateString) return null;
    // Convertir ISO en local MySQL format: "YYYY-MM-DD HH:mm:ss"
    const date = new Date(dateString);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 19).replace('T', ' ');
}

function Card ({title ="Todo Title", due_date="Due date", description="Todo Description", todo_state="Not started", id=0, onClose, onUpdate, onDelete}) {
    const colors = {
        "Not started": "gray",
        "In progress": "#84b753",
        "Done": "#77a6ac"
    }
    const {user} =  React.useContext(userContext)

    const api_url = process.env.REACT_APP_API_URL
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [fromModalVisible, setFormModalVisible] = useState(false)

    const closeForm = () => {
        setFormModalVisible(false)
    }

    const showEditionForm = () => {
        setFormModalVisible(true)
    }

    const showDeleteModal = () => {
        setDeleteModalVisible(true)
    }
    const closeDeleteModal = () => {
        setDeleteModalVisible(false)
    }

    const [state, setState] = useState(getKeyByValue(statuses, todo_state))
    const select = useRef(null)

    const actualizeState = (e) => {
        axios.get(api_url + "/todos/" + id, {
            headers: { "Authorization": "Bearer " + user.token }
          }).then((res) => {
            const todo = {...res.data};
            todo.due_time = formatDateForMySQL(todo.due_time);
            todo.status = statuses[e.target.value];
            
            axios.put(api_url + "/todos/" + id, todo, {
              headers: { "Authorization": "Bearer " + user.token }
            }).catch((err) => {
              console.log("API ERROR");
            }).then((res) => {
              onUpdate();
            });
          });
        setState(e.target.value)
    }

    const setColor = () => {
        select.current.style.backgroundColor = colors[state]
    }

    useEffect(setColor)

    return (
        <>
            <div className="card">
                <div className="card_text">
                    <h4 className="todo_title">{title}</h4>
                    <p className="small_text">{due_date}</p>
                    <p>{description}</p>
                </div>

                <div className="card_btns">
                    <div className="card_upper_btns">
                        <button onClick={showEditionForm}><img src={edit} alt="" /></button>
                        <button onClick={showDeleteModal}><img src={trash} alt="" /></button>
                    </div>
                    <select value={state} name="status" class="status" ref={select} onChange={actualizeState}>
                        <option value="Not started">Not started</option>
                        <option value="In progress">In progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>
                { deleteModalVisible && <DeleteModal onClose={closeDeleteModal} deleteFunc={onDelete}/>}
                { fromModalVisible && <ToDoFormModal onUpdate={onUpdate} onClose={closeForm} _title={title} _description={description} _due_date={new Date(due_date)} id={id}/>}
        </>
    )
}
Card.propTypes = {
    title: PropTypes.string,
    due_date: PropTypes.string,
    description: PropTypes.string,
    todo_state: PropTypes.string
};

export default Card;