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
      <div className="p-4 bg-white text-black border-2 border-black font-semibold">
        Permanently delete collection{" "}
        <span className="font-bold text-blue-700">{collection.name}</span>. This
        action is not reversible.
      </div>

      <ConfirmDeletion collectionId={collection.id} />
    </div>
  );
}

export default Page;
