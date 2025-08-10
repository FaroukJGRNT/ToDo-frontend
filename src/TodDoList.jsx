import { useContext, useEffect, useState } from "react"
import Card from "./Card"
import axios from "axios"
import { userContext } from "./userContext"
import { useNavigate } from "react-router-dom"
import InfoSection from "./InfoSection"

function ToDoList () {
    const navigate = useNavigate()
    const {user, setUser} = useContext(userContext)
    const [todos, setTodos] = useState([])
    const api_url = process.env.REACT_APP_API_URL

    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
      }, [user])

    const deleteTodo = (id) => {
        axios.delete(api_url + "/todos/" + (id).toString(), {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })
        setTodos(todos.filter((todo) => todo.id != id))
    }

    // Fetching our user's todos
    const fetchTodos = () => {
        // Getting all todos
        axios.get(api_url + "/todos", {
            headers: {
                Authorization: "Bearer " + user.token
            }
        // Filter
        }).then((res) => {
            const userTodos = res.data.filter((todo => todo.user_id === user.id)) 
            setTodos(userTodos)
        })
    }

    useEffect(() => {
        fetchTodos()
    }, [user])

    if (todos.length == 0) {
        return (
            <>
                <InfoSection onUpdate={fetchTodos}/>
                <h2 style={{color: "grey", fontWeight: "normal", marginTop: 100}}>No task for now. Add some!</h2>
            </>
        )
    } else {
        return (
            <>
                <InfoSection onUpdate={fetchTodos}/>
                {todos.map((todo, index) => {
                    const date = new Date(todo.due_time)
                    const readable = date.toLocaleString("en-EN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC"
                    });

                    return (<Card
                    onClose={() => deleteTodo(index)}
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    todo_state={todo.status}
                    due_date={readable}
                    onUpdate={fetchTodos}
                    onDelete={() => deleteTodo(todo.id)}/>)
                })}
            </>
        )
    }
}

export default ToDoList;