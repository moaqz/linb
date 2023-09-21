"use client";

import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import { useRef, useState } from "react";

import { Button, Modal } from "@/features/ui";
import { createLinkService } from "../services";

export function CreateLinkModal({ collectionId }: { collectionId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useSWRConfig();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (formData: FormData) => {
    try {
      await createLinkService({
        collectionId,
        formData,
      });

      setIsOpen(false);
      formRef.current?.reset();
      mutate(`/api/collections/${collectionId}/links?page=1`);
      toast.success("Link added succesfully.");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Link</Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add Link">
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
            aria-invalid={!!errorMessage}
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
            aria-invalid={!!errorMessage}
            className="border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          {errorMessage && (
            <p className="mt-2 text-red-600 font-semibold">{errorMessage}</p>
          )}

          <div className="flex items-center gap-2 mt-4">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
