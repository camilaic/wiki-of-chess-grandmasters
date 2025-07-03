import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders image and title", () => {
    render(
      <Header
        title={"Test title"}
        imageSrc={"test.png"}
        altForImage={"a random image"}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Test title" }),
    ).toBeInTheDocument();

    const img = screen.getByRole("img", { name: "a random image" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "test.png");
    expect(img).toHaveAttribute("alt", "a random image");
  });
});
