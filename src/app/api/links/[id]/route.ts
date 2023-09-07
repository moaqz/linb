import { db } from "@/server/connection";
import { links } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const user = await currentUser();
  if (user == null) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized: User not logged in",
      }),
      { status: 401 },
    );
  }

  const linkId = Number(params.id);
  if (isNaN(linkId) || linkId <= 0) {
    return new Response(
      JSON.stringify({
        message: "Invalid link_id",
      }),
      { status: 400 },
    );
  }

  try {
    await db
      .delete(links)
      .where(and(eq(links.user_id, user.id), eq(links.id, linkId)));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }

  return new Response(
    JSON.stringify({
      message: "Link successfully deleted",
    }),
    { status: 200 },
  );
}
