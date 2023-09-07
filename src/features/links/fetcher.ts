export async function fetcher(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "Sorry, we couldn't fetch the data at the moment. Please try again later.",
    );
    
    throw error;
  }

  return response.json();
}
