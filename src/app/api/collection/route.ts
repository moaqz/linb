import { validateCollectionName } from "@/lib/validations";
import { createCollection } from "@/server/queries/collections";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const user = await currentUser();

  if (user == null) {
    return new Response(null, { status: 401 });
  }

  const { name } = await request.json();
  const validationError = validateCollectionName(name);

  if (validationError) {
    return new Response(
      JSON.stringify({ status: "failed", error: validationError }),
      {
        status: 400,
      },
    );
  }

  try {
    await createCollection({ name: name, userId: user.id });

    revalidatePath("/collections");
    return new Response(
      JSON.stringify({ status: "success", revalidated: true, now: Date.now() }),
      {
        status: 201,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ status: "failed" }), {
      status: 500,
    });
  }
}
