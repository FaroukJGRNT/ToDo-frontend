import SmallHeader from "./SmallHeader";
import axios from "axios"
import Home from "./Home"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { userContext } from "./userContext";
import React from "react";

function RegisterBox () {

    const {user, setUser} =  React.useContext(userContext)
    const api_url = process.env.REACT_APP_API_URL
    const [okay, setOkay] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setUser(null)
    }, [setUser])

    const submitForm = () => {
        const data = {
            "email": email,
            "password": password,
            "name": firstName,
            "firstname": lastName
        }

        // Trying to register
        axios.post(api_url + "/register/", data)
            //  If successful, login, get the token
            // and redirect to home
            .then(response => {
                // Trying to log in
                axios.post(api_url + "/login/", {"email": email, "password": password})
                    .then(response => {
                        // Logging successful, getting additional infos
                        const token = response.data.token
                        axios.get(api_url + "/users/" + email, {
                            headers: {
                                "Authorization": "Bearer " + token
                            }
                        }).then(userRes => {
                            setUser({
                                email,
                                token,
                                id: userRes.data.id,
                                first_name: userRes.data.name,
                                last_name: userRes.data.firstname,
                            })
                            navigate("/")
                        })
                    })

            }).catch(response => {
                console.log(response.data)
                setOkay(false)
            })
    }

    return (
        <div id="register_box">
            <SmallHeader/>
            <div className="login_container" id="register_container">
                { !okay && <p style={{color: "red"}}>Invalid infos</p>}
                <form className="login_form" onSubmit={(e) => { e.preventDefault(); submitForm() }}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="text_input" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="text_input" onChange={(e) => {setPassword(e.target.value)}}/>
                    <label htmlFor="frist_name">First Name</label>
                    <input type="text" name="frist_name" id="frist_name" className="text_input" onChange={(e) => {setFirstName(e.target.value)}}/>
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" id="last_name" className="text_input" onChange={(e) => {setLastName(e.target.value)}}/>
                    <button type="submit" id="submit_btn">Register</button>
                </form>
                <p>Already have an account? <a className="text_link" href="/login">Log in</a></p>
            </div>
        </div>
    )
}

export default RegisterBox;