export default function ModalView({tech, onClose}){
    return (
        <div className="modal-view">
            <h2>{tech.name}</h2>
            <p>Category: {tech.category?.name ?? "—"}</p>
            <p>Parent: {tech.parent?.name ?? "—"}</p>
            <p>Training Time: {tech.trainingTime ?? "—"}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}