import { db } from "@/server/connection";
import { links } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";

import { ValiError, parse } from "valibot";
import { CreateLinkSchema } from "@/features/links/validations";

export async function POST(request: Request) {
  const user = await currentUser();
  if (user == null) {
    return new Response(null, { status: 401 });
  }

  const data = await request.json();

  try {
    const { name, url, collectionId } = parse(CreateLinkSchema, data);

    await db.insert(links).values({
      name,
      url,
      user_id: user.id,
      collection_id: collectionId,
    });
  } catch (error) {
    if (error instanceof ValiError) {
      return new Response(
        JSON.stringify({
          message: error.message,
        }),
        { status: 400 },
      );
    }

    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 201 });
}
