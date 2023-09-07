export async function createLinkService({
  collectionId,
  formData,
}: {
  collectionId: string;
  formData: FormData;
}) {
  const response = await fetch("/api/links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("link_name"),
      collection_id: Number(collectionId),
      url: formData.get("link_url"),
    }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const data = await response.json();

      // Valibot error.
      throw new Error(data.message);
    }

    throw new Error("Something went wrong!");
  }

  return;
}
