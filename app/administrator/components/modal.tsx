import ReactModal from "react-modal";

interface ModalProps {
  isOpen: any;
  onClose: any;
  children: any;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 2000,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "5px",
          border: 0,
          padding: "0px",
          overflow: "hidden",
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
