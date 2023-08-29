"use client";

import { editCollection } from "@/actions/edit-collection-action";
import { toast } from "react-hot-toast";

function EditCollection({
  id,
  visibility,
  name,
}: {
  id: number;
  visibility: "private" | "public" | null;
  name: string;
}) {
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
      <div>
        <input
          type="text"
          id="collection_id"
          name="collection_id"
          value={id}
          hidden
        />
      </div>

      <div>
        <label
          htmlFor="collection_name"
          className="text-sm font-semibold mb-1 block"
        >
          Collection name
        </label>
        <input
          type="text"
          id="collection_name"
          name="collection_name"
          defaultValue={name}
          className="w-full border-2 border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
        />
      </div>

      <div>
        <label
          htmlFor="collection_visibility"
          className="text-sm font-semibold mb-1 block"
        >
          Visibility
        </label>
        <select
          name="collection_visibility"
          id="collection_visibility"
          className="w-full border-2 bg-white border-black p-2 placeholder:text-black/70 focus:outline-double aria-[invalid=true]:border-red-600"
        >
          <option value="private" selected={visibility === "private"}>
            Private
          </option>
          <option value="public" selected={visibility === "public"}>
            Public
          </option>
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
