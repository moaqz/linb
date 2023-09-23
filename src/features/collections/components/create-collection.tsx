"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import { Button, Modal } from "@/features/ui";
import { createCollectionAction } from "@collections/actions/create-collection-action";
import { CreateCollectionType } from "../validations";

function CreateCollection({ totalRecords }: { totalRecords: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCollectionType>();

  const onSubmit = handleSubmit(async (data: CreateCollectionType) => {
    const body = new FormData();
    Object.entries(data).forEach(([key, value]) => body.append(key, value));

    const result = await createCollectionAction(body);
    if (result?.error) {
      setError("root", {
        message: result.error,
      });

      return;
    }

    toast.success("Collection created succesfully.");
    setIsOpen(false);
    reset();
  });

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        disabled={totalRecords >= 5}
        aria-disabled={totalRecords >= 5 ? "true" : "false"}
      >
        Create collection ({totalRecords == null ? 0 : totalRecords}/5)
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create collection"
      >
        <form className="space-y-2" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Collection name (max 50 characters)"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Collection name should be 50 characters or fewer.",
              },
            })}
            className="w-full border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          {errors.name && (
            <p role="alert" className="text-red-600 font-semibold">
              {errors.name.message}
            </p>
          )}

          {errors.root && (
            <p role="alert" className="text-red-600 font-semibold">
              {errors.root.message}
            </p>
          )}

          <div className="space-x-3">
            <Button
              type="button"
              color="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CreateCollection;
