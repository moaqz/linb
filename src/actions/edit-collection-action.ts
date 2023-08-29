"use server";

import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export const editCollection = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const {
    collection_id: id,
    collection_name: name,
    collection_visibility: visibility,
  } = Object.fromEntries(data);

  try {
    await db
      .update(collections)
      .set({
        name: name,
        visiblity: visibility,
      })
      .where(and(eq(collections.id, id), eq(collections.user_id, user.id)));

    return;
  } catch (error) {
    throw new Error("There was an error.");
  }
};
