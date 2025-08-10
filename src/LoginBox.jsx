import { useNavigate } from "react-router-dom"
import SmallHeader from "./SmallHeader"
import axios from "axios"
import Home from "./Home"
import React from "react"
import { userContext } from "./userContext"
import { useState } from "react"

function LoginBox () {

    const {user, setUser} =  React.useContext(userContext)
    const api_url = process.env.REACT_APP_API_URL
    const [okay, setOkay] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    React.useEffect(() => {
        setUser(null)
      }, [setUser])

    const submitForm = () => {
        const data = {
            email: email,
            password: password
        }
        console.log(`Logging in with email: ${email} and password: ${password}`)

        axios.post(api_url + "/login/", data)
        .then(res => {
            const token = res.data.token
            return axios.get(api_url + "/users/" + email, {
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
        .catch((res) => {
            console.log(res)
            setOkay(false)
        })
    }

    return (
        <>
            <SmallHeader/>
            <div className="login_container">
                { !okay && <p style={{color: "red"}}>E-mail or password incorrect</p>}
                <form className="login_form" onSubmit={(e) => { e.preventDefault(); submitForm() }}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="text_input" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="text_input" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button type="submit" id="submit_btn">Login</button>
                </form>
                <p>No account? <a className="text_link" href="/register">Register</a></p>
            </div>
        </>
    )
}

export default LoginBox