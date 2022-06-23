/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// Before search implementation.
// test("On initial render, there are 100 found", async () => {
//   render(<App />);
//   expect(await screen.findByTestId("found-images-number")).toHaveTextContent(
//     "Found 100 images."
//   );
// });

test("On initial render, there are no images to show", async () => {
  render(<App />);
  expect(await screen.findByTestId("found-images-number")).toHaveTextContent(
    "Found 0 images."
  );
});

test("On initial render, loading is false", () => {
  render(<App />);
  const loadingText = screen.queryByText("Loading...");
  expect(loadingText).toBeNull();
});

test("On initial render, reset button is disabled", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /reset search/i })).toBeDisabled();
});

test("On initial render, search bar is empty", async () => {
  render(<App />);

  const input = screen.getByLabelText(/Search for image:/i);
  expect(await input.value).toBe("");
});

test("On user search input, the search input works.", async () => {
  render(<App />);

  const input = screen.getByLabelText(/Search for image:/i);

  await fireEvent.change(input, { target: { value: "moon" } });
  expect(await input.value).toBe("moon");
});
