"use server";

import { AuthRequiredError, ValidationError } from "@/lib/expection";
import { validateCollectionName } from "@/lib/validations";
import { db } from "@/server/connection";
import { collections } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const createCollection = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const name = data.get("collection_name");
  if (name === null || typeof name !== "string") {
    throw new ValidationError("Collection name cannot be empty.");
  }

  const validationError = validateCollectionName(name);
  if (validationError) {
    throw new ValidationError(validationError);
  }

  try {
    await db.insert(collections).values({
      user_id: user.id,
      name: name,
    });

    revalidatePath("/collections");
    return;
  } catch (error) {
    throw new Error("There was an error.");
  }
};
