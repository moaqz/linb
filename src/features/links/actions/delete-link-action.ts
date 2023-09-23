"use server";

import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";
import { links } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteLinkAction = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const linkId = Number(data.get("link_id"));
  const collectionId = data.get("collection_id");

  if (isNaN(linkId) || linkId <= 0) {
    return {
      error: "invalid link id",
    };
  }

  if (!collectionId || typeof collectionId !== "string") {
    return {
      error: "invalid collection id",
    };
  }

  try {
    await db
      .delete(links)
      .where(and(eq(links.user_id, user.id), eq(links.id, linkId)));

    revalidatePath(`/collections/${collectionId}`);
    return { message: "Link successfully deleted!" };
  } catch (error) {
    return { message: "There was an error." };
  }
};
