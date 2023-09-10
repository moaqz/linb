"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button, Modal } from "@/features/ui";
import { deleteCollectionAction } from "../actions/delete-collection-action";

export function ConfirmDeletion({ collectionId }: { collectionId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const deleteCollectionHandler = async (data: FormData) => {
    try {
      await deleteCollectionAction(data);
      router.push("/collections");
      toast.success("Collection deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>

      <Modal
        title="Do you want to delete this project?"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form action={deleteCollectionHandler}>
          <input
            type="text"
            name="collection_id"
            defaultValue={collectionId}
            hidden
          />

          <Button type="submit">Delete</Button>
        </form>
      </Modal>
    </div>
  );
}
