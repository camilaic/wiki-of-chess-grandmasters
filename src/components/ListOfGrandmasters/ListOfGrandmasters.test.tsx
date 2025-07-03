import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ListOfGrandmasters from "./ListOfGrandmasters";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mock child components
jest.mock("../Header", () => () => <div data-testid="header" />);
jest.mock("../Loader", () => () => <div data-testid="loader" />);
jest.mock(
  "../Pagination",
  () =>
    ({ totalNumberPages, setCurrentPageCallback, currentPage }: any) => (
      <button
        data-testid="pagination"
        onClick={() => setCurrentPageCallback(currentPage + 1)}
      >
        Next Page
      </button>
    ),
);

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("ListOfGrandmasters", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loader while fetching data", async () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    renderWithRouter(<ListOfGrandmasters />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows error message if fetch fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
    renderWithRouter(<ListOfGrandmasters />);
    await waitFor(() =>
      expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument(),
    );
  });

  it("renders list when fetch succeeds", async () => {
    const players = ["Carlos", "Norris", "Alonso"];
    mockedAxios.get.mockResolvedValueOnce({ data: { players } });

    renderWithRouter(<ListOfGrandmasters />);
    // Wait for loader to disappear and list to appear
    for (const username of players) {
      await waitFor(() =>
        expect(screen.getByText(username)).toBeInTheDocument(),
      );
    }
    expect(screen.getAllByRole("link")).toHaveLength(players.length);
  });

  it("renders pagination and handles page change", async () => {
    const players = Array.from({ length: 53 }, (_, i) => `username${i + 1}`);
    mockedAxios.get.mockResolvedValueOnce({ data: { players } });

    renderWithRouter(<ListOfGrandmasters />);
    // Wait page to render
    await waitFor(() =>
      expect(screen.getByText("username1")).toBeInTheDocument(),
    );
    // Only 50 usernames on first page
    expect(screen.queryByText("username51")).not.toBeInTheDocument();

    // next page
    fireEvent.click(screen.getByTestId("pagination"));

    // username51 should be visible
    await waitFor(() =>
      expect(screen.getByText("username51")).toBeInTheDocument(),
    );
  });

  it("renders Header component", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { players: [] } });
    renderWithRouter(<ListOfGrandmasters />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
