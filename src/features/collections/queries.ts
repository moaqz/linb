import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq, sql } from "drizzle-orm";

export async function getUserCollections() {
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
      visibility: collections.visibility,
      collection_count: sql<number>`(SELECT COUNT(*) FROM collections WHERE user_id = ${user.id})`,
    })
    .from(collections)
    .where(eq(collections.user_id, user.id))
    .limit(5);
}

export async function getCollectionInformation(collectionId: number) {
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
    .where(
      and(eq(collections.id, collectionId), eq(collections.user_id, user.id)),
    );
}

export async function getCollectionById(collectionId: number) {
  return db
    .select({
      id: collections.id,
      userId: collections.user_id,
    })
    .from(collections)
    .where(eq(collections.id, collectionId));
}
