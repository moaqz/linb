"use server";

import { AuthRequiredError } from "@/lib/expection";
import { CreateCollectionSchema } from "@/lib/validations";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ValiError, parse } from "valibot";

export const createCollection = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  try {
    const { name } = parse(CreateCollectionSchema, {
      name: data.get("collection_name"),
    });

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
