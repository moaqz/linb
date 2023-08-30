"use client";

import { editCollection } from "@/actions/edit-collection-action";
import { toast } from "react-hot-toast";
import { EditCollectionType } from "@/lib/validations";

function EditCollection({ id, visibility, name }: EditCollectionType) {
  const editCollectionHandler = async (data: FormData) => {
    try {
      await editCollection(data);

      toast.success("Collection updated!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      className="flex flex-col max-w-md gap-4"
      action={editCollectionHandler}
    >
      <input type="text" id="id" name="id" defaultValue={id} hidden disabled />

      <div>
        <label htmlFor="name" className="text-sm font-semibold mb-1 block">
          Collection name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={name}
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
          className="w-full border-2 bg-white border-black p-2 placeholder:text-black/70 focus:outline-double"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-fit px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
      >
        Save
      </button>
    </form>
  );
}

export default EditCollection;
