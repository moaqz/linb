import { eq } from "drizzle-orm";
import { db } from "../connection";
import { collections } from "../schema";

export async function getUserCollections(userId: string) {
  const data = await db
    .select({
      id: collections.id,
      name: collections.name,
      user_id: collections.user_id,
      created_at: collections.created_at,
      visibility: collections.visiblity,
    })
    .from(collections)
    .where(eq(collections.user_id, userId))
    .limit(5);

  return data;
}

export async function createCollection({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  const createdCollection = await db.insert(collections).values({
    user_id: userId,
    name: name,
  });

  return createdCollection;
}
