"use server";

import { AuthRequiredError } from "@/lib/expection";
import { DeleteCollectionSchema } from "@/lib/validations";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { parse } from "valibot";

export const deleteCollection = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const { id } = parse(DeleteCollectionSchema, {
    id: Number(data.get("collection_id")),
  });

  try {
    await db
      .delete(collections)
      .where(and(eq(collections.id, id), eq(collections.user_id, user.id)));
  } catch (error) {
    throw new Error("There was an error.");
  }

  revalidatePath("/collections");
};
