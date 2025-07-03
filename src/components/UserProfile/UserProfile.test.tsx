import "@testing-library/jest-dom";
import axios from "axios";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";

// Mock the child components
jest.mock("../Header", () => ({ title, imageSrc, altForImage }) => (
  <div data-testid="header">{title}</div>
));
jest.mock("./UserDetails", () => (props: any) => (
  <div data-testid="user-details">{props.name}</div>
));
jest.mock("./Overview", () => (props: any) => (
  <div data-testid="overview">{props.playerId}</div>
));
jest.mock("../Loader", () => () => <div data-testid="loader">Loading...</div>);

// Mock camelcase-keys to just return the input for simplicity
jest.mock("camelcase-keys", () => (obj: any) => obj);

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useParams
export function renderWithRouter(
  ui: React.ReactElement,
  { route = "/profile/carlossainz", path = "/profile/:username" } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("UserProfile", () => {
  const userData = {
    avatar: "avatar-url",
    username: "carlossainz",
    country: "country/SP",
    followers: 3,
    isStreamer: false,
    joined: 1719955200,
    lastOnline: 1720041600,
    league: "Legend",
    playerId: 123456,
    status: "active",
    streamingPlatforms: [],
    title: "GM",
    url: "https://mysite/carlossainz",
    verified: true,
    name: "Carlos Sainz",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the components Header, UserDetails and Overview", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: userData });

    renderWithRouter(<UserProfile />);

    await waitFor(() =>
      expect(screen.getByTestId("header")).toHaveTextContent("carlossainz"),
    );
    expect(screen.getByTestId("user-details")).toHaveTextContent(
      "Carlos Sainz",
    );
    expect(screen.getByTestId("overview")).toHaveTextContent("123456");
  });

  it("shows loader while fetching data", () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    renderWithRouter(<UserProfile />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows error message if fetch fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("error"));
    renderWithRouter(<UserProfile />);
    await waitFor(() =>
      expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument(),
    );
  });
});
