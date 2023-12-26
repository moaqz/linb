import { db } from "@/server/connection";
import { links } from "@/server/schema";
import { and, desc, eq, sql } from "drizzle-orm";

export async function getTotalUserLinks({
  userId,
  collectionId,
}: {
  userId: string;
  collectionId: number;
}) {
  const [result] = await db
    .select({ counter: sql<number>`COUNT(*)` })
    .from(links)
    .where(
      and(eq(links.user_id, userId), eq(links.collection_id, collectionId)),
    );

  return result;
}

export async function getUserLinks({
  userId,
  collectionId,
  limit,
  offset,
}: {
  userId: string;
  collectionId: number;
  limit: number;
  offset: number;
}) {
  const data = await db
    .select({
      id: links.id,
      name: links.name,
      url: links.url,
      collection_id: links.collection_id,
    })
    .from(links)
    .where(
      and(eq(links.user_id, userId), eq(links.collection_id, collectionId)),
    )
    .orderBy(desc(links.created_at))
    .limit(limit)
    .offset(offset);

  return data;
}
