import { useRef } from "react";
import pfp from "./assets/pfp.jpg"
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./userContext";
import UserModificationModal from "./UserModificationModal";
import { useState, useEffect } from "react";

function Header () {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
      }, [user])

    const [isEditFormVisible, setEditFormVisible] = useState(false)

    const showEditForm = () => {
        setEditFormVisible(true)
    }
    const closeEditForm = () => {
        setEditFormVisible(false)
    }

    const displayOptions = () => {
        const options = document.getElementById("dropdown_options")
        options.style.display = "block";
    }

    const dropRef = useRef(null)

    const handleCloseDrop = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target))
            dropRef.current.style.display = "none"
    }

    document.addEventListener("mousedown", handleCloseDrop)


    return (
        <>
            <div className="header">
                <h4>TO DO - by Farouk Okanla</h4>
                <div className="profile">
                    <div className="dropdown">
                        <button onClick={displayOptions}><h4>{user ? user.first_name : "Profile Name"}</h4></button>
                        <div id="dropdown_options" ref={dropRef}>
                            <option className="dropdown_option" onClick={() => navigate("/login")}>Log out</option>
                        </div>
                    </div>
                    <img src={pfp} alt="Profile Pic"/>
                </div>
            </div>
            <hr />
            {isEditFormVisible && <UserModificationModal onClose={closeEditForm}/>}
        </>
    )
}

export default Header
