"use server";

import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ValiError, parse } from "valibot";
import { EditCollectionSchema } from "../validations";

export const editCollectionAction = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const entries = Object.fromEntries(data.entries());
  const collection = {
    id: Number(entries.id),
    name: entries.name,
    // TODO: Update visibility with user preference when the feature is fully implemented.
    visibility: "private",
  };

  try {
    const { id, name, visibility } = parse(EditCollectionSchema, collection);

    await db
      .update(collections)
      .set({
        name,
        visibility,
      })
      .where(and(eq(collections.id, id), eq(collections.user_id, user.id)));

    revalidatePath(`/collections/${id}/settings/general`);
  } catch (error) {
    if (error instanceof ValiError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Something went wrong!",
    };
  }
};
