"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button, Modal, TrashIcon } from "@/features/ui";
import { deleteLinkService } from "../services";
import { mutate } from "swr";

export function DeleteConfirmationModal({
  linkId,
  collectionId,
  currentPage,
}: {
  linkId: number;
  currentPage: number;
  collectionId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnDelete = async () => {
    try {
      await deleteLinkService(linkId);
      toast.success("Link deleted succesfully.");
      mutate(`/api/collections/${collectionId}/links?page=${currentPage}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
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

        <Button onClick={handleOnDelete}>Delete</Button>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;
