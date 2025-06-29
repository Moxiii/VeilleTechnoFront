import {motion} from "framer-motion";
import  React,{useRef} from "react";
import {faTimes, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "@components/Modal/PopUpModal/PopUpModal.scss"



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.JSX.Element;
}

export default function Modal({isOpen, onClose, title, children}: ModalProps) {
    if (!isOpen) return null;
    const constraintsRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    return (
        <motion.div ref={constraintsRef} style={{overflow: "hidden"}}>
            <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                className="project-modal"
                style={{pointerEvents: "auto", touchAction: "auto"}}
            >
                <div className="modal-header">
                    {title && <h2 className="modal-title">{title}</h2>}
                    <button className="close-btn" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <div className="modal-content" ref={modalContentRef}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    )

}