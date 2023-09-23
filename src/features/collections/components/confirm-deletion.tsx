"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button, Modal } from "@/features/ui";
import { deleteCollectionAction } from "../actions/delete-collection-action";

export function ConfirmDeletion({ collectionId }: { collectionId: number }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const deleteCollection = async (data: FormData) => {
    try {
      await deleteCollectionAction(data);
      toast.success("Collection deleted successfully");
      setIsOpen(false);
      router.push("/collections");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>

      <Modal
        title="Do you want to delete this collection?"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form action={deleteCollection} className="space-y-3">
          <input
            type="hidden"
            name="collection_id"
            defaultValue={collectionId}
          />

          <p className="text-gray-600">
            This action cannot be undone. This will permanently delete the
            collection.
          </p>

          <div className="space-x-3">
            <Button
              color="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Delete collection</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
