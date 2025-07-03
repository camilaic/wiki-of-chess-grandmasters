import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const setCurrentPageCallback = jest.fn();

  beforeEach(() => {
    setCurrentPageCallback.mockClear();
  });

  it("renders the correct number of page buttons", () => {
    render(
      <Pagination
        totalNumberPages={3}
        currentPage={1}
        setCurrentPageCallback={setCurrentPageCallback}
      />,
    );
    // Should render three buttons: 1, 2, 3
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
  });

  it("highlights the active page", () => {
    render(
      <Pagination
        totalNumberPages={3}
        currentPage={2}
        setCurrentPageCallback={setCurrentPageCallback}
      />,
    );
    const activeButton = screen.getByRole("button", { name: "2" });
    expect(activeButton).toHaveClass("active");
  });

  it("calls setCurrentPageCallback with the correct page when a button is clicked", async () => {
    render(
      <Pagination
        totalNumberPages={3}
        currentPage={1}
        setCurrentPageCallback={setCurrentPageCallback}
      />,
    );
    const button = screen.getByRole("button", { name: "3" });
    await userEvent.click(button);
    expect(setCurrentPageCallback).toHaveBeenCalledWith(3);
  });
});
