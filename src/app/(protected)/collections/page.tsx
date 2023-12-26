import { getUserCollections } from "@/features/collections/queries";
import CollectionTable from "@collections/components/collection-table";
import CreateCollection from "@collections/components/create-collection";

async function Collections() {
  const collections = await getUserCollections();

  return (
    <>
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <h2 className="text-2xl font-medium">Collections</h2>
        <CreateCollection totalRecords={collections?.[0]?.collection_count} />
      </div>

      <CollectionTable collections={collections} />
    </>
  );
}

export default Collections;
