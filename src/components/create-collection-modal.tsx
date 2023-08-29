"use client";

import { useRef, useState } from "react";
import Dialog from "./dialog";
import { createCollection } from "@/actions/create-collection-action";

function CreateCollectionModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (formData: FormData) => {
    try {
      await createCollection(formData);
      formRef.current?.reset();
      dialogRef.current?.close();
    } catch (error) {
      // All errors have the name 'Error' even though they are custom errors.
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Dialog title="Create collection" ref={dialogRef}>
      <form className="flex flex-col" action={onSubmit} ref={formRef}>
        <input
          type="text"
          name="collection_name"
          placeholder="Collection name (max 50 characters)"
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
    </Dialog>
  );
}

export default CreateCollectionModal;
