import { CreateLinkSchema } from "@/lib/validations";
import { db } from "@/server/connection";
import { links } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { ValiError, parse } from "valibot";

export async function POST(request: Request) {
  const user = await currentUser();
  if (user == null) {
    return new Response(null, { status: 401 });
  }

  const data = await request.json();

  try {
    const { name, url, collection_id } = parse(CreateLinkSchema, data);

    await db.insert(links).values({
      name: name,
      url: url,
      user_id: user.id,
      collection_id: collection_id,
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
