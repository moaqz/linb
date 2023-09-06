"use server";

import { AuthRequiredError } from "@/lib/expection";
import { CreateCollectionSchema } from "../validations";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ValiError, parse } from "valibot";

export const createCollectionAction = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  try {
    const { name } = parse(CreateCollectionSchema, {
      name: data.get("collection_name"),
    });

    const [responseData] = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(collections)
      .where(eq(collections.user_id, user.id));

    if (responseData.count >= 5) {
      return {
        error: "You have reached the maximum limit of collections (5).",
      };
    }

    await db.insert(collections).values({
      user_id: user.id,
      name: name,
    });
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

  revalidatePath("/collections");
};
