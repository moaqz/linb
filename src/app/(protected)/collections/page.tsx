import CollectionList from "@/components/collection-list";
import CreateCollectionModal from "@/components/create-collection-modal";
import { AuthRequiredError } from "@/lib/expection";

import { getUserCollections } from "@/server/queries/collections";
import { currentUser } from "@clerk/nextjs";

async function fetchCollections() {
  const user = await currentUser();

  if (user == null) {
    throw new AuthRequiredError();
  }

  return getUserCollections(user.id);
}

async function Collections() {
  const collections = await fetchCollections();

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Collections</h2>
        <CreateCollectionModal />
      </div>
      <CollectionList collections={collections} />
    </section>
  );
}

export default Collections;
