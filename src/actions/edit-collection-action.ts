"use server";

import { AuthRequiredError } from "@/lib/expection";
import { EditCollectionSchema } from "@/lib/validations";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ValiError, parse } from "valibot";

export const editCollection = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const entries = Object.fromEntries(data.entries());
  const collection = {
    id: Number(entries.id),
    name: entries.name,
    visibility: entries.visibility,
  };

  try {
    const { id, name, visibility } = parse(EditCollectionSchema, collection);

    await db
      .update(collections)
      .set({
        name: name,
        visiblity: visibility,
      })
      .where(and(eq(collections.id, id), eq(collections.user_id, user.id)));

    return;
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
