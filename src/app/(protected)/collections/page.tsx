import CreateCollectionModal from "@/components/create-collection-modal";

async function Collections() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Collections</h2>
        <CreateCollectionModal />
      </div>
    </section>
  );
}

export default Collections;
