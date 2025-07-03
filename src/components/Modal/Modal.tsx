import { useEffect } from "react";
import Button from "../Button/Button";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => unknown;
  heading: string;
}

const Modal = ({ children, onClose, heading }: ModalProps) => {
  const onContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const escapeKeyPress = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escapeKeyPress);
    return () => document.removeEventListener("keydown", escapeKeyPress);
  }, []);

  return (
    <div className="absolute top-[0] left-[0] bottom-[0] right-[0] flex justify-center bg-white">
      <div onClick={onContentClick}>
        <div className="flex justify-between mb-10">
          <h2>{heading}</h2>
          <Button onClick={() => onClose()} variants={""}>
            x
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
