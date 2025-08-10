
function DeleteModal ({onClose, deleteFunc}) {
    return (
        <>
        <div className="modal_overlay"></div>
        <div className="modal_container">
            <p>Are you sure you<br/>want to delete this task ?</p>
            <div className="modal_btns">
                <button id="cancel_btn" onClick={onClose}>Cancel</button>
                <button id="delete_btn" onClick={deleteFunc}>Delete</button>
            </div>
        </div>
        </>
    )
}

export default DeleteModal;
