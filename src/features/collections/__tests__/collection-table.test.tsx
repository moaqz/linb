import { render, screen } from "@testing-library/react";
import CollectionTable from "../components/collection-table";
import { Collection } from "../types";

test("Should render a row with 'No collections found' message", () => {
  render(<CollectionTable collections={[]} />);

  const row = screen.getByText("No collections found");
  expect(row).toBeInTheDocument();
  expect(row).toBeVisible();
});

const collections: Collection[] = [
  {
    id: 32,
    name: "Sample Collection 1",
    user_id: "24b54dt6878520b40b206923",
    visibility: "public",
    created_at: new Date("2023-09-02 14:40:05.655922"),
  },
  {
    id: 30,
    name: "Sample Collection 2",
    user_id: "29b946d6878520b40a206923",
    visibility: "private",
    created_at: new Date("2023-04-02 14:40:05.655922"),
  },
];

test("Should render each collection as a row in the table", () => {
  render(<CollectionTable collections={collections} />);

  for (const collection of collections) {
    expect(screen.getByText(collection.name)).toBeInTheDocument();

    expect(
      screen.getByText(collection.created_at!.toLocaleDateString()),
    ).toBeInTheDocument();

    expect(screen.getByText(collection.visibility)).toBeInTheDocument();
  }
});
