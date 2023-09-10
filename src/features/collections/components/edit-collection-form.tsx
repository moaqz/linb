"use client";

import { toast } from "react-hot-toast";

import { EditCollectionType } from "../validations";
import { Button } from "@/features/ui";
import { editCollectionAction } from "../actions/edit-collection-action";

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
      className="flex flex-col max-w-md gap-4"
      action={editCollectionHandler}
    >
      <input type="number" id="id" name="id" defaultValue={id} hidden />

      <div>
        <label htmlFor="name" className="text-sm font-semibold mb-1 block">
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
          className="text-sm font-semibold mb-1 block"
        >
          Visibility
        </label>
        <select
          name="visibility"
          id="visibility"
          defaultValue={visibility}
          disabled
          className="w-full border-2 bg-white border-black p-2 placeholder:text-black/70 focus:outline-double"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <p className="text-gray-500 text-sm mt-2">
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
