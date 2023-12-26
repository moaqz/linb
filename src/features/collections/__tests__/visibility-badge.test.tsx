import { render } from "@testing-library/react";
import VisibilityBadge from "../components/visibility-badge";

test("Should render with the correct content", () => {
  const { getByText, rerender } = render(
    <VisibilityBadge visibility="private" />,
  );

  expect(getByText(/private/i)).toBeVisible();

  rerender(<VisibilityBadge visibility="public" />);
  expect(getByText(/public/i)).toBeVisible();
});
