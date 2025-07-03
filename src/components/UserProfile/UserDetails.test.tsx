import axios from "axios";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserDetails from "./UserDetails";

jest.mock("./HoursSinceLastLogin", () => () => (
  <span data-testid="hours-since-last-login">23:00:04</span>
));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("UserDetails", () => {
  const defaultProps = {
    avatar: "https://example.com/avatar.png",
    country: "https://restcountries.com/v3.1/alpha/BR",
    followers: 4,
    joined: 1719955200,
    lastOnline: 1720041600,
    name: "Carlos Sainz",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders user details", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { name: "Spain" } });

    renderWithRouter(<UserDetails {...defaultProps} />);

    // Avatar
    const avatar = screen.getByAltText("User avatar") as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe(defaultProps.avatar);

    // Name
    expect(screen.getByText(/Name:/)).toHaveTextContent(
      `Name: ${defaultProps.name}`,
    );

    await waitFor(() =>
      expect(screen.getByText(/Country :/)).toHaveTextContent(
        "Country : Spain",
      ),
    );

    // Number of followers
    expect(screen.getByText(/Followers:/)).toHaveTextContent(
      `Followers: ${defaultProps.followers}`,
    );

    // Joined date
    expect(screen.getByText(/Joined date:/)).toHaveTextContent(
      "Joined date: 2/7/2024",
    );

    // HoursSinceLastLogin
    expect(screen.getByTestId("hours-since-last-login")).toBeInTheDocument();
  });

  it("shows default avatar if there is no avatar", () => {
    render(<UserDetails {...defaultProps} avatar="" />);
    const avatar = screen.getByAltText("User avatar") as HTMLImageElement;
    expect(avatar.src).toContain("/chess-player.png");
  });

  it("does not render name if not provided", () => {
    render(<UserDetails {...defaultProps} name={undefined} />);
    expect(screen.queryByText(/Name:/)).not.toBeInTheDocument();
  });

  it("does not render country if not provided", () => {
    render(<UserDetails {...defaultProps} country={""} />);
    expect(screen.queryByText(/Country:/)).not.toBeInTheDocument();
  });
});
