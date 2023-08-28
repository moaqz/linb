import React, { ReactNode, Ref, forwardRef } from "react";

interface DialogProps {
  children: ReactNode;
  title: string;
}

const Dialog = forwardRef((props: DialogProps, ref: Ref<HTMLDialogElement>) => {
  const showModal = () => {
    ref?.current.showModal();
  };

  const closeModal = () => {
    ref?.current.close();
  };

  return (
    <>
      <button
        className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
        onClick={showModal}
      >
        {props.title}
      </button>

      <dialog
        ref={ref}
        className="backdrop:bg-black/40 w-full p-4 bg-white shadow-[2px_3px] border-4 border-black max-w-md"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-semibold">{props.title}</p>
          <button onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {props.children}
      </dialog>
    </>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
