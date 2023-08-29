import { notFound } from "next/navigation";
import { getCollectionInformation } from "../general/page";
import DeleteCollection from "@/components/delete-collection";

async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const [collection] = await getCollectionInformation(id);

  if (collection == null) {
    notFound();
  }

  return (
    <div className="space-y-4 max-w-lg">
      <h2 className="text-xl font-semibold">Delete Collection</h2>
      <div className="p-4 bg-white text-black border-2 border-black font-semibold">
        Permanently delete project{" "}
        <span className="font-bold text-blue-700">{collection.name}</span>. This
        action is not reversible.
      </div>

      <DeleteCollection collectionId={collection.id} />
    </div>
  );
}

export default Page;
