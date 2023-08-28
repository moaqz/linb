const specialCharsRegex = /[!@#$%^&*()><?":\-_]/;

export function validateCollectionName(s: string): string | null {
  if (s === null || typeof s !== "string") {
    return "Collection name cannot be empty.";
  }

  if (s.length > 50) {
    return "Collection name must be 50 characters or less.";
  }

  if (specialCharsRegex.test(s)) {
    return "Collection name cannot contain special characters.";
  }

  return null;
}
