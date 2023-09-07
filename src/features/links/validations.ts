import {
  Input,
  maxLength,
  minLength,
  minValue,
  number,
  object,
  string,
  url,
} from "valibot";

export const CreateLinkSchema = object({
  name: string([
    minLength(1, "Link name cannot be empty."),
    maxLength(50, "Link name should be 50 characters or fewer."),
  ]),
  url: string([url()]),
  collection_id: number([minValue(1, "Invalid collection ID")]),
});

export type CreateLinkType = Input<typeof CreateLinkSchema>;
