import CollectionTable from "@collections/components/collection-table";
import { getUserCollections } from "@/features/collections/queries";
import CreateCollection from "@collections/components/create-collection";

async function Collections() {
  const collections = await getUserCollections();

  return (
    <section>
      <div className="flex flex-col gap-2 justify-between sm:flex-row">
        <h2 className="text-2xl font-medium">Collections</h2>
        <CreateCollection totalRecords={collections?.[0]?.collection_count} />
      </div>

      <CollectionTable collections={collections} />
    </section>
  );
}

export default Collections;
