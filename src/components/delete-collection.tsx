"use client";

import { deleteCollection } from "@/actions/delete-collection-action";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-hot-toast";

function DeleteCollection({ collectionId }: { collectionId: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const openDialog = () => {
    dialogRef.current!.showModal();
  };

  const closeDialog = () => {
    dialogRef.current!.close();
  };

  const deleteCollectionHandler = async (data: FormData) => {
    try {
      await deleteCollection(data);

      closeDialog();
      router.push("/collections");

      toast.success("Collection deleted successfully");
    } catch (error) {
      closeDialog();
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <button
        className="shadow-[2px_3px_#000] border-2 border-black rounded px-2 py-1 font-semibold text-white bg-red-700 transition-shadow hover:shadow-none"
        onClick={openDialog}
      >
        Delete
      </button>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/40 w-full p-4 bg-white shadow-[2px_3px] border-4 border-black max-w-md"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold">
            Do you want to delete this project?
          </p>
          <button onClick={closeDialog}>
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

        <form action={deleteCollectionHandler}>
          <input
            type="text"
            name="collection_id"
            defaultValue={collectionId}
            hidden
          />
          <button
            type="submit"
            className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
          >
            Delete
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default DeleteCollection;
