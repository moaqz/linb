"use client";

import { useRef, useState } from "react";
import { XMarkIcon } from "./ui/icons";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

function CreateLinkDialog({
  collectionId,
  page,
}: {
  collectionId: string;
  page: number;
}) {
  const { mutate } = useSWRConfig();
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
    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("link_name"),
        collection_id: Number(collectionId),
        url: formData.get("link_url"),
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(data.message);
        return;
      }

      setErrorMessage("Something went wrong!");
      return;
    }

    formRef.current?.reset();
    closeModal();

    mutate(`/api/collections/${collectionId}/links?page=${page}`);
    toast.success("Collection created succesfully.");
  };

  return (
    <div>
      <button
        className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
        onClick={showModal}
      >
        Add Link
      </button>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/40 w-full p-4 bg-white shadow-[2px_3px] border-4 border-black max-w-md"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-semibold">Add Link</p>
          <button onClick={closeModal}>
            <XMarkIcon width={24} height={24} />
          </button>
        </div>

        <form className="flex flex-col" action={onSubmit} ref={formRef}>
          <label htmlFor="link_name" className="text-sm font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="link_name"
            name="link_name"
            placeholder="Name (max 50 characters)"
            minLength={1}
            maxLength={50}
            required
            aria-invalid={errorMessage ? true : false}
            className="border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          <label htmlFor="link_url" className="text-sm font-semibold mt-4 mb-1">
            Link
          </label>
          <input
            type="url"
            id="link_url"
            name="link_url"
            placeholder="Paste link here"
            pattern="https://.*"
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

export default CreateLinkDialog;
