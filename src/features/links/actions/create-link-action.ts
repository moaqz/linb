"use server";

import { AuthRequiredError } from "@/lib/expection";
import { db } from "@/server/connection";
import { links } from "@/server/schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { parse } from "valibot";
import { CreateLinkSchema } from "../validations";

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
