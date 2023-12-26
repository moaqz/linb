"use client";

import { toast } from "react-hot-toast";

import { Button } from "@/features/ui";
import { editCollectionAction } from "../actions/edit-collection-action";
import { EditCollectionType } from "../validations";

export function EditCollectionForm({
  id,
  visibility,
  name,
}: EditCollectionType) {
  const editCollectionHandler = async (data: FormData) => {
    const response = await editCollectionAction(data);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Collection updated!");
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      action={editCollectionHandler}
    >
      <input type="number" id="id" name="id" defaultValue={id} hidden />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold">
          Collection name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          required
          maxLength={50}
          minLength={1}
          className="w-full border-2 border-black p-2 placeholder:text-black/70 focus:outline-double"
        />
      </div>

      <div>
        <label
          htmlFor="visibility"
          className="mb-1 block text-sm font-semibold"
        >
          Visibility
        </label>
        <select
          name="visibility"
          id="visibility"
          defaultValue={visibility}
          disabled
          className="w-full border-2 border-black bg-white p-2 placeholder:text-black/70 focus:outline-double"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <p className="mt-2 text-sm text-gray-500">
          The option to change collection visibility is currently under
          development and will be available soon.
        </p>
      </div>

      <div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
