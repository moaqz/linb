"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button, Modal, TrashIcon } from "@/features/ui";
import { deleteLinkAction } from "../actions/delete-link-action";

export function DeleteConfirmationModal({
  linkId,
  collectionId,
}: {
  linkId: number;
  collectionId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async (data: FormData) => {
    try {
      await deleteLinkAction(data);
      toast.success("Link deleted succesfully.");
    } catch (error) {
      toast.error("There was an error.");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Delete Link"
        className="rounded border border-transparent bg-red-50  p-1 text-red-500 transition-transform hover:scale-110"
      >
        <TrashIcon width={16} height={16} />
      </button>
      <Modal title="Delete Link" open={isOpen} onClose={() => setIsOpen(false)}>
        <p className="mb-4 font-medium">
          This action cannot be undone. It will permanently delete the link.
        </p>

        <form action={onDelete}>
          <input
            type="hidden"
            name="link_id"
            defaultValue={linkId.toString()}
          />
          <input
            type="hidden"
            name="collection_id"
            defaultValue={collectionId.toString()}
          />
          <div className="space-x-3">
            <Button
              type="button"
              color="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Delete</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;
