"use client";

import { useRef, useState } from "react";
import { createCollection } from "@/actions/create-collection-action";
import { toast } from "react-hot-toast";

function CreateCollectionModal({ totalRecords }: { totalRecords: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const onSubmit = async (formData: FormData) => {
    const result = await createCollection(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    formRef.current?.reset();
    dialogRef.current?.close();
    setErrorMessage("");

    toast.success("Collection created succesfully.");
  };

  return (
    <div>
      <button
        className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
        onClick={showModal}
        disabled={totalRecords >= 5}
      >
        Create collection ({totalRecords}/5)
      </button>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/40 w-full p-4 bg-white shadow-[2px_3px] border-4 border-black max-w-md"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-semibold">Create collection</p>
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

        <form className="flex flex-col" action={onSubmit} ref={formRef}>
          <input
            type="text"
            name="collection_name"
            placeholder="Collection name (max 50 characters)"
            minLength={1}
            maxLength={50}
            required
            aria-invalid={errorMessage ? true : false}
            className="border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          {errorMessage && (
            <p className="mt-2 text-red-600 font-semibold">{errorMessage}</p>
          )}

          <div className="flex items-center gap-2 mt-4">
            <button
              type="submit"
              className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
            >
              Create
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default CreateCollectionModal;
