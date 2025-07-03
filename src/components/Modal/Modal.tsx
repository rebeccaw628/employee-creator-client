import { useEffect } from "react";
import Button from "../Button/Button";

interface ModalProps {
  heading: string;
  onClose: () => unknown;
  variants: string;
  children: React.ReactNode;
}

const Modal = ({ heading, onClose, variants, children }: ModalProps) => {
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
    <div
      className={`fixed inset-0 flex justify-center items-center ${variants}`}
      onClick={onClose}
    >
      <div
        onClick={onContentClick}
        className="h-auto p-4 rounded bg-white border"
      >
        <div className="flex justify-between mb-10">
          <h2 className="text-xl">{heading}</h2>
          <Button onClick={onClose} variants={"cursor-pointer"}>
            x
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
