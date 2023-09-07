import { EditCollectionForm } from "@/features/collections/components";
import { getCollectionInformation } from "@/features/collections/queries";
import { notFound } from "next/navigation";


async function Page({ params }: { params: { id: string } }) {
  const collectionId = Number(params.id);
  const [collection] = await getCollectionInformation(collectionId);

  if (collection == null) {
    notFound();
  }

  return <EditCollectionForm {...collection} />;
}

export default Page;
