import CollectionTable from "@collections/components/collection-table";
import { getUserCollections } from "@/features/collections/queries";
import CreateCollection from "@collections/components/create-collection";

async function Collections() {
  const collections = await getUserCollections();

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold">Collections</h2>
        <CreateCollection totalRecords={collections?.[0]?.collection_count} />
      </div>

      <CollectionTable collections={collections} />
    </section>
  );
}

export default Collections;
