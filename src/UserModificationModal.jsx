import axios from "axios"
import Home from "./Home"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { userContext } from "./userContext";
import React from "react";

function UserModificationModal ({onClose}) {

    const {user, setUser} =  React.useContext(userContext)
    const api_url = process.env.REACT_APP_API_URL
    const [email, setEmail] = useState(user.email)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const navigate = useNavigate()

    const submitForm = () => {
        const data = {
            "password": user.password,
            "email": email,
            "name": firstName,
            "firstname": lastName
        }

        axios.put(api_url + "/users/" + user.id, data,
            {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            }
        ).then(
            axios.get(api_url + "/users/" + email, {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            }).then(userRes => {
                setUser({
                    ...user,
                    first_name: userRes.data.name,
                    last_name: userRes.data.firstname,
                    email: userRes.data.email
                })
                onClose()
            })
        )
    }

    return (
        <>
        <div className="modal_overlay"></div>
        <div id="register_box">
            <div className="login_container">
                <h2>Edit profile infos</h2>
                <form className="login_form" onSubmit={(e) => { e.preventDefault(); submitForm() }}>
                    <label htmlFor="email">Email</label>
                    <input value={email} type="email" name="email" id="email" className="text_input" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label htmlFor="frist_name">First Name</label>
                    <input value={firstName} type="text" name="frist_name" id="frist_name" className="text_input" onChange={(e) => {setFirstName(e.target.value)}}/>
                    <label htmlFor="last_name">Last Name</label>
                    <input value={lastName} type="text" name="last_name" id="last_name" className="text_input" onChange={(e) => {setLastName(e.target.value)}}/>
                    <button id="big_cancel_btn" onClick={onClose}>Cancel</button>
                    <button onClick={submitForm} id="submit_btn">Edit infos</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default UserModificationModal;