"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Button, Modal } from "@/features/ui";
import { deleteCollectionAction } from "../actions/delete-collection-action";

export function ConfirmDeletion({ collectionId }: { collectionId: number }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [input, setInput] = useState("");

  const deleteCollection = async (data: FormData) => {
    if (randomWord !== input) {
      toast.error("The words do not match");
      setIsOpen(false);
      return;
    }

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

  useEffect(() => {
    setRandomWord(
      crypto.randomUUID().split("-")[0]
    );
  }, []);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>

      <Modal
        title="Do you want to delete this project?"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form action={deleteCollection} className="space-y-3">
          <input
            type="text"
            name="collection_id"
            defaultValue={collectionId}
            hidden
          />

          <p className="text-gray-600">
            Deleting a collection is irreversible. If you want to delete this collection, please type{" "}
            <code className="font-bold text-black">{randomWord}</code> in the box below and click the button.
          </p>

          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            className="w-full border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          <Button type="submit">Delete collection</Button>
        </form>
      </Modal>
    </div>
  );
}
