import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Overview from "./Overview";

jest.mock("./HoursSinceLastLogin", () => () => (
  <span data-testid="hours-since-last-login">23:00:04</span>
));

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("UserDetails", () => {
  const defaultProps = {
    title: "GM",
    league: "Legend",
    playerId: 4,
    status: "premium",
    url: "https://example.com/profile",
    verified: true,
    isStreamer: true,
    streamingPlatforms: [],
  };

  it("renders overview", async () => {
    renderWithRouter(<Overview {...defaultProps} />);

    // Title
    expect(screen.getByText(/Title:/)).toHaveTextContent(
      `Title: ${defaultProps.title}`,
    );

    // League
    expect(screen.getByText(/League:/)).toHaveTextContent(
      `League: ${defaultProps.league}`,
    );

    // Player id
    expect(screen.getByText(/Player id:/)).toHaveTextContent(
      `Player id: ${defaultProps.playerId}`,
    );

    // Status
    expect(screen.getByText(/Status:/)).toHaveTextContent(
      `Status: ${defaultProps.status}`,
    );

    // More details
    expect(screen.getByText(/More details:/)).toHaveTextContent(
      `More details: ${defaultProps.url}`,
    );

    // Verified
    expect(screen.getByText(/Verified/)).toHaveTextContent("Verified: Yes");

    // Streamer
    expect(screen.getByText(/Streamer/)).toHaveTextContent("Streamer: Yes");

    // Streaming Platforms
    expect(screen.getByText(/Streaming Platforms/)).toHaveTextContent(
      "Streaming Platforms: None",
    );
  });

  it("shows streaming platforms list", () => {
    render(
      <Overview
        {...defaultProps}
        streamingPlatforms={["mystream1", "mystream2"]}
      />,
    );
    expect(screen.getByText(/Streaming Platforms/)).toHaveTextContent(
      "Streaming Platforms: mystream1, mystream2",
    );
  });

  it("shows No for verified and streamer if values are false", () => {
    render(<Overview {...defaultProps} verified={false} isStreamer={false} />);
    // Verified
    expect(screen.getByText(/Verified/)).toHaveTextContent("Verified: No");

    // Streamer
    expect(screen.getByText(/Streamer/)).toHaveTextContent("Streamer: No");
  });
});
