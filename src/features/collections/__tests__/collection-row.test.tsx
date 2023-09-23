import { render, screen } from "@testing-library/react";
import CollectionRow from "../components/collection-row";
import { Collection } from "../types";

const collectionData: Collection = {
  id: 90,
  name: "Sample Collection",
  user_id: "29b946d6878520b40a206923",
  visibility: "public",
  created_at: new Date("2023-09-02 14:40:05.655922"),
};

test("Should render a link to the collection with the correct href", () => {
  render(<CollectionRow {...collectionData} />);

  const collectionLink = screen.getByRole("link", {
    name: collectionData.name,
  });

  expect(collectionLink).toBeInTheDocument();
  expect(collectionLink).toHaveAttribute(
    "href",
    `/collections/${collectionData.id}`
  );
});

test("Should render a settings link with the correct href and aria-label", () => {
  render(<CollectionRow {...collectionData} />);

  const settingsLink = screen.getByRole("link", {
    name: `Settings for ${collectionData.name}`,
  });

  expect(settingsLink).toBeInTheDocument();
  expect(settingsLink).toHaveAttribute(
    "href",
    `/collections/${collectionData.id}/settings/general`
  );
  expect(settingsLink).toHaveAttribute(
    "aria-label",
    `Settings for ${collectionData.name}`
  );
});

test("Should render visibility and date correctly", () => {
  render(<CollectionRow {...collectionData} />);

  const visibilityBadge = screen.getByText(/public/i);
  const formattedDate = screen.getByText(
    collectionData.created_at!.toLocaleDateString()
  );

  expect(visibilityBadge).toBeInTheDocument();
  expect(visibilityBadge).toBeVisible();
  expect(formattedDate).toBeInTheDocument();
  expect(formattedDate).toBeVisible();
});
