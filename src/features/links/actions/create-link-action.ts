"use server";

import { AuthRequiredError } from "@/lib/expection";
import { currentUser } from "@clerk/nextjs";
import { parse } from "valibot";
import { CreateLinkSchema } from "../validations";
import { links } from "@/server/schema";
import { db } from "@/server/connection";
import { revalidatePath } from "next/cache";

export const createLinkAction = async (data: FormData) => {
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  try {
    const { collectionId, name, url } = parse(CreateLinkSchema, {
      collectionId: Number(data.get("collectionId")),
      name: data.get("name"),
      url: data.get("url"),
    });

    await db.insert(links).values({
      name,
      url,
      user_id: user.id,
      collection_id: collectionId,
    });

    revalidatePath(`/collections/${collectionId}`);
    return { message: "Success" };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
