"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { Button, Modal } from "@/features/ui";
import { createCollectionAction } from "@collections/actions/create-collection-action";

function CreateCollection({ totalRecords }: { totalRecords: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (formData: FormData) => {
    const result = await createCollectionAction(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    setIsOpen(false);
    setErrorMessage("");
    formRef.current?.reset();

    toast.success("Collection created succesfully.");
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} disabled={totalRecords >= 5}>
        Create collection ({totalRecords == null ? 0 : totalRecords}/5)
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create collection"
      >
        <form className="space-y-2" action={onSubmit} ref={formRef}>
          <input
            type="text"
            name="collection_name"
            placeholder="Collection name (max 50 characters)"
            minLength={1}
            maxLength={50}
            required
            aria-invalid={!!errorMessage}
            className="w-full border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          {errorMessage && (
            <p className="text-red-600 font-semibold">{errorMessage}</p>
          )}

          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
}

export default CreateCollection;
