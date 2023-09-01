import EditCollection from "@/components/edit-collection";
import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getCollectionInformation(id: number) {
  const user = await currentUser();

  if (user == null) {
    throw new AuthRequiredError();
  }

  return await db
    .select({
      id: collections.id,
      name: collections.name,
      visibility: collections.visibility,
    })
    .from(collections)
    .where(and(eq(collections.id, id), eq(collections.user_id, user.id)));
}

async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const [collection] = await getCollectionInformation(id);

  if (collection == null) {
    notFound();
  }

  return <EditCollection {...collection} />;
}

export default Page;
