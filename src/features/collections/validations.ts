import {
  Input,
  enumType,
  maxLength,
  minLength,
  number,
  object,
  string,
} from "valibot";

export const CreateCollectionSchema = object({
  name: string([
    minLength(1, "Collection name cannot be empty."),
    maxLength(50, "Collection name should be 50 characters or fewer."),
  ]),
});

export type CreateCollectionType = Input<typeof CreateCollectionSchema>;

export const EditCollectionSchema = object({
  id: number(),
  name: string([
    minLength(1, "Collection name cannot be empty."),
    maxLength(50, "Collection name should be 50 characters or fewer."),
  ]),
  visibility: enumType(["private", "public"], "Invalid visibility value."),
});

export type EditCollectionType = Input<typeof EditCollectionSchema>;

export const DeleteCollectionSchema = object({
  id: number(),
});

export type DeleteCollectionType = Input<typeof DeleteCollectionSchema>;
