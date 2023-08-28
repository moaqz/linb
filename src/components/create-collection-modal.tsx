"use client";

import { FormEvent, useRef } from "react";
import Dialog from "./dialog";

function CreateCollectionModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("collection_name"),
      }),
    });

    if (!res.ok) {
      return;
    }

    dialogRef.current?.close();
  };

  return (
    <Dialog title="Create collection" ref={dialogRef}>
      <form className="flex flex-col" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="collection_name"
          placeholder="Collection name (max 50 characters)"
          maxLength={50}
          required
          className="border-2 border-black p-2 placeholder:text-black/70 focus:outline-double"
        />

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
