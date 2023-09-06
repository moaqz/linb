import { Input, maxLength, minLength, object, string } from "valibot";

export const CreateCollectionSchema = object({
  name: string([
    minLength(1, "Collection name cannot be empty."),
    maxLength(50, "Collection name should be 50 characters or fewer."),
  ]),
});

export type CreateCollectionType = Input<typeof CreateCollectionSchema>;
