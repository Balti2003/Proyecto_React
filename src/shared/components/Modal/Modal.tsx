import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./context/ModalContext";

interface Props {
    children: React.ReactNode;
}

export const Modal = ({ children }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const { state, setState } = useContext(ModalContext);
    
    const modalRoot = document.getElementById("modal")
    if (!modalRoot) return null;

    const closeModal = () => {
        setState(false)
    }

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setState(false)
            }
        }

        if(state) {
            document.addEventListener("keydown", handleEsc)
        }

        return () => {
            document.removeEventListener("keydown", handleEsc)
        }
    }, [setState, state])

    return createPortal(
    <div className="overlay" onClick={closeModal}>
        <div className="modal" onClick={handleContentClick} ref={modalRef}>
            <button className="close-button" onClick={closeModal}>Cerrar</button>
            {children}
        </div>
    </div>, 
    modalRoot);
}