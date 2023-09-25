import { db } from "@/server/connection";
import { links } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, desc, eq, sql } from "drizzle-orm";

const LIMIT_PER_PAGE = 12;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();
  if (user == null) {
    return new Response(null, { status: 401 });
  }

  const collectionID = Number(params.id);
  if (isNaN(collectionID) || collectionID < 1) {
    return new Response(
      JSON.stringify({
        message: "invalid collection id",
      }),
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  let page = Number(url.searchParams.get("page"));
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const offset = (page - 1) * LIMIT_PER_PAGE;

  try {
    const [totalRecords] = await db
      .select({ counter: sql<number>`COUNT(*)` })
      .from(links)
      .where(
        and(eq(links.user_id, user.id), eq(links.collection_id, collectionID))
      );

    if (totalRecords.counter === 0) {
      return new Response(
        JSON.stringify({
          links: [],
          totalPages: 0,
        }),
        { status: 200 }
      );
    }

    const data = await db
      .select({
        id: links.id,
        name: links.name,
        url: links.url,
        collection_id: links.collection_id,
      })
      .from(links)
      .where(
        and(eq(links.user_id, user.id), eq(links.collection_id, collectionID))
      )
      .orderBy(desc(links.created_at))
      .limit(LIMIT_PER_PAGE)
      .offset(offset);

    const totalPageCount = Math.ceil(totalRecords.counter / LIMIT_PER_PAGE);

    return new Response(
      JSON.stringify({
        links: data,
        totalPages: totalPageCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
