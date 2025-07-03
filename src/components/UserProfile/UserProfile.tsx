import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { chessmasterProfile } from "../../libraries/constants";

import Header from "../Header";
import Overview from "./Overview";
import UserDetails from "./UserDetails";
import Loader from "../Loader";

import "./user-profile.css";

export interface UserProfile {
  avatar: string;
  username: string;
  country: string;
  followers: number;
  isStreamer: boolean;
  joined: number;
  lastOnline: number;
  league: string;
  playerId: number;
  status: string;
  streamingPlatforms: [];
  title: string;
  url: string;
  verified: boolean;
  name?: string;
}

function UserProfile() {
  const [userDetails, setUserDetails] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { username } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${chessmasterProfile(username)}`);
        // convert the response to camelCases variables to align with React best practices for naming
        const camelCasedData = camelcaseKeys(response.data);
        setUserDetails(camelCasedData);
      } catch (e) {
        console.log(e); // Send to Sentry or another error tracking service
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const renderDetails = () => {
    if (!userDetails) {
      return null;
    }

    const {
      avatar,
      name,
      followers,
      isStreamer,
      joined,
      lastOnline,
      league,
      playerId,
      status,
      streamingPlatforms,
      title,
      url,
      verified,
      country,
      username,
    } = userDetails;

    return (
      <>
        <Header
          title={username}
          imageSrc="/chess-player.png"
          altForImage={"An user with a piece of chess"}
        />

        <div className="details-container">
          <UserDetails
            avatar={avatar}
            country={country}
            followers={followers}
            joined={joined}
            lastOnline={lastOnline}
            name={name}
          />
          <hr />
          <Overview
            isStreamer={isStreamer}
            league={league}
            playerId={playerId}
            status={status}
            streamingPlatforms={streamingPlatforms}
            title={title}
            url={url}
            verified={verified}
          />
        </div>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        renderDetails()
      )}
    </>
  );
}

export default UserProfile;
