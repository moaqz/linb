import CollectionList from "@/components/collection-list";
import CreateCollectionModal from "@/components/create-collection-modal";
import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";

import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

async function fetchCollections() {
  const user = await currentUser();

  if (user == null) {
    throw new AuthRequiredError();
  }

  return await db
    .select({
      id: collections.id,
      name: collections.name,
      user_id: collections.user_id,
      created_at: collections.created_at,
      visibility: collections.visiblity,
    })
    .from(collections)
    .where(eq(collections.user_id, user.id))
    .limit(5);
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
