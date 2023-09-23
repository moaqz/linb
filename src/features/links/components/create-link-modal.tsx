"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Modal } from "@/features/ui";
import { CreateLinkType } from "../validations";
import { createLinkAction } from "../actions/create-link-action";

const pattern =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&/=]*)$/;

export function CreateLinkModal({ collectionId }: { collectionId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<CreateLinkType, "collectionId">>();

  const onCreate = handleSubmit(
    async (data: Omit<CreateLinkType, "collectionId">) => {
      const body = new FormData();
      Object.entries(data).forEach(([key, value]) => body.append(key, value));
      body.append("collectionId", collectionId);

      const result = await createLinkAction(body);
      if (result?.error) {
        setError("root", {
          message: result.error,
        });
        return;
      }

      toast.success("Collection created succesfully.");
      setIsOpen(false);
      reset();
    }
  );

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Link</Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add Link">
        <form className="flex flex-col" onSubmit={onCreate}>
          <label htmlFor="name" className="text-sm font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Name (max 50 characters)"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Link name should be 50 characters or fewer.",
              },
            })}
            aria-invalid={errors.name ? "true" : "false"}
            className="border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          {errors.name && (
            <span role="alert" className="mt-2 text-red-600 font-semibold">
              {errors.name.message}
            </span>
          )}

          <label htmlFor="url" className="text-sm font-semibold mt-4 mb-1">
            Link
          </label>
          <input
            type="url"
            placeholder="Paste link here"
            {...register("url", {
              required: "URL is required",
              pattern: { message: "Invalid URL", value: pattern },
            })}
            aria-invalid={errors.url ? "true" : "false"}
            className="border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
          />

          {errors.url && (
            <span role="alert" className="mt-2 text-red-600 font-semibold">
              {errors.url.message}
            </span>
          )}

          {errors.root && (
            <span role="alert" className="mt-2 text-red-600 font-semibold">
              {errors.root.message}
            </span>
          )}

          <div className="space-x-3 mt-4">
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
