import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@components/Modal/PopUpModal/PopUpModal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.JSX.Element;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-container"
            onClick={(e) => e.stopPropagation()} // important : clique intérieur ≠ fermer le modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-header">
              {title && <h2 className="modal-title">{title}</h2>}
              <button className="close-btn" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
