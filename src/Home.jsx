import InfoSection from "./InfoSection";
import Header from "./Header";
import Card from "./Card";
import {userContext} from "./userContext";
import LoginBox from "./LoginBox";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToDoList from "./TodDoList";


function Home () {
    
    const {user, setUser} = React.useContext(userContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
      }, [user])

    return (
        <>
            <Header/>
            <ToDoList/>
        </>
    )
}

export default Home;