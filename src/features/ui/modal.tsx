"use client";

import {
  KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { XMarkIcon } from "./icons";

interface ModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, open, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOnClose = useCallback(() => {
    modalRef.current?.close();
    onClose();
  }, [onClose]);

  // After closing the dialog with the Esc key, the dialog won't open again.
  // That's because the open prop isn't being updated upon Esc.
  function handleKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "Escape") {
      handleOnClose();
    }
  }

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
      return;
    }

    handleOnClose();
  }, [open, handleOnClose]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="w-full max-w-md border-4 border-black bg-white p-4 shadow-[2px_3px] backdrop:bg-black/40"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xl font-semibold">{title}</p>

        <button type="button" onClick={handleOnClose}>
          <XMarkIcon width="24" height="24" />
        </button>
      </div>

      {children}
    </dialog>
  );
}
