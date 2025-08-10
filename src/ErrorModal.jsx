
function ErrorModal ({onClose}) {
    return (
        <>
        <div className="modal_overlay"></div>
        <div className="modal_container">
            <h2>Error</h2>
            <p>Invalid infos</p>
            <div className="modal_btns">
                <button id="cancel_btn" onClick={onClose}>Close</button>
            </div>
        </div>
        </>
    )
}

export default ErrorModal;
