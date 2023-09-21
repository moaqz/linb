"use client";

import { FormEvent, useState } from "react";
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
        onClick={() => setIsOpen(true)}
        aria-label="Delete Link"
        className="bg-red-50 text-red-500 border border-transparent  rounded p-1 hover:scale-110 transition-transform"
      >
        <TrashIcon width={16} height={16} />
      </button>
      <Modal title="Delete Link" open={isOpen} onClose={() => setIsOpen(false)}>
        <p className="mb-4 font-medium">
          This action cannot be undone. It will permanently delete the link.
        </p>

        <form action={onDelete}>
          <input type="hidden" name="link_id" defaultValue={linkId.toString()} />
          <input type="hidden" name="collection_id" defaultValue={collectionId.toString()} />
          <Button type="submit">Delete</Button>
        </form>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;
