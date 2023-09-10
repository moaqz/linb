import { notFound } from "next/navigation";

import { getCollectionInformation } from "@/features/collections/queries";
import { ConfirmDeletion } from "@/features/collections/components";

async function Page({ params }: { params: { id: string } }) {
  const collectionId = Number(params.id);
  const [collection] = await getCollectionInformation(collectionId);

  if (collection == null) {
    notFound();
  }

  return (
    <div className="space-y-4 max-w-lg">
      <h2 className="text-xl font-semibold">Delete Collection</h2>
      <div className="p-4 text-md bg-white text-black border-2 border-black font-semibold">
        Permanently delete collection{" "}
        <span className="font-semibold text-violet-700 underline">
          {collection.name}
        </span>
        . This action is not reversible. To delete this collection, please
        ensure that it is empty. If there are links in this collection, you won
        {"'"}t be able to delete it.
      </div>

      <ConfirmDeletion collectionId={collection.id} />
    </div>
  );
}

export default Page;
