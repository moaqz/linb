"use server";

import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { parse } from "valibot";
import { DeleteCollectionSchema } from "../validations";
import { NeonDbError } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

export const deleteCollectionAction = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  try {
    const { id } = parse(DeleteCollectionSchema, {
      id: Number(data.get("collection_id")),
    });

    await db
      .delete(collections)
      .where(and(eq(collections.id, id), eq(collections.user_id, user.id)));
  } catch (error) {
    if (error instanceof NeonDbError) {
      // Foreign key violation
      if (error.code === "23503") {
        return {
          error: "Cannot delete. Collection has associated links.",
        };
      }
    }

    return {
      error: "There was an error.",
    };
  }

  revalidatePath("/collections");
  redirect("/collections");
};
