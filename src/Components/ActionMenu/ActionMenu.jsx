import { useState } from "react";
import s from "./ActionMenu.module.scss";
import Modal from "@components/Modal/PopUpModal/PopUpModal";
export default function ActionMenu({ data, onEdit, onDelete, actions = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const defaultActions = [
    ...(onEdit
      ? [
          {
            label: "edit",
            onClick: onEdit,
          },
        ]
      : []),
    ...actions,
    ...(onDelete
      ? [
          {
            label: "delete",
            danger: true,
            onClick: onDelete,
            requireConfirmation: true,
          },
        ]
      : []),
  ];
  const handleAction = (action) => {
    if (action.requireConfirmation) {
      setActionToConfirm(action);
      return;
    }
    action.onClick(data);
    setIsOpen(false);
  };
  const handleClose = () => {
    setActionToConfirm(null);
    setIsOpen(false);
  };
  const handleConfirm = () => {
    if (!actionToConfirm) return;

    actionToConfirm.onClick(data);
    handleClose();
  };
  return (
    <div className={s.actions}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open actions for ${data.name}`}
      >
        ⋮
      </button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title={actionToConfirm ? "Confirm Action" : `Actions — ${data.name}`}
        >
          {actionToConfirm ? (
            <div className={s.confirmation}>
              <p>
                Are you sure you want to delete <strong>{data.name}</strong>?
              </p>

              <p>This action cannot be undone.</p>

              <div className={s.confirmationActions}>
                <button type="button" onClick={() => setActionToConfirm(null)}>
                  Cancel
                </button>

                <button
                  type="button"
                  className={s.danger}
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <div className={s.actionsMenu}>
              {defaultActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className={action.danger ? s.danger : ""}
                  onClick={() => handleAction(action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
