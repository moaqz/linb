import {
  url,
  Input,
  maxLength,
  minLength,
  minValue,
  number,
  object,
  string,
} from "valibot";

export const CreateLinkSchema = object({
  name: string([
    minLength(1, "Link name cannot be empty."),
    maxLength(50, "Link name should be 50 characters or fewer."),
  ]),
  url: string([url()]),
  collectionId: number([minValue(1, "Invalid collection ID")]),
});

export type CreateLinkType = Input<typeof CreateLinkSchema>;
