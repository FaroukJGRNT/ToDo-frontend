import ToDoFormModal from "./ToDoFormModal"
import { useState } from "react"
import UserModificationModal from "./UserModificationModal"

function InfoSection ({onUpdate}) {

    const [isFormVisible, setFormVisible] = useState(false)

    const showForm = () => {
        setFormVisible(true)
    }
    const closeForm = () => { 
        setFormVisible(false)
    }

    return (
        <>
            <div className="info_section">
                <h1>YOUR TASKS</h1>
                <h3>"Be strongrth than your excuse."</h3>
                <button onClick={showForm} id="info_section_btn">New task +</button>
                {isFormVisible && <ToDoFormModal onUpdate={onUpdate} onClose={closeForm}/>}
            </div>
        </>
    )
}

export default InfoSection
