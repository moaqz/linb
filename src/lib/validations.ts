import {
  Input,
  enumType,
  maxLength,
  minLength,
  minValue,
  number,
  object,
  string,
  url,
} from "valibot";

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

export const CreateLinkSchema = object({
  name: string([
    minLength(1, "Link name cannot be empty."),
    maxLength(50, "Link name should be 50 characters or fewer."),
  ]),
  url: string([url()]),
  collection_id: number([minValue(1, "Invalid collection ID")]),
});

export type CreateLinkType = Input<typeof CreateLinkSchema>;
