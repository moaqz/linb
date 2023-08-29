"use server";

import { AuthRequiredError, ValidationError } from "@/lib/expection";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export const deleteCollection = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const id = Number(data.get("collection_id"));
  if (id === null || typeof id !== "number") {
    throw new ValidationError("Invalid collection id");
  }

  try {
    await db
      .delete(collections)
      .where(and(eq(collections.id, id), eq(collections.user_id, user.id)));

    return;
  } catch (error) {
    throw new Error("There was an error.");
  }
};
