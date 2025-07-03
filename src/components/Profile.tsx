// user is redirect to this component and we fetch the details here
import { useEffect, useState } from "react";
import axios from "axios";
import { chessmasterProfile } from "../libraries/constants";
import { useParams } from "react-router-dom";
import type { IUserProfile } from "../libraries/interfaces";
import camelcaseKeys from "camelcase-keys";
import HoursSinceLastLogin from "./HoursSinceLastLogin";

function Profile() {
  const [userDetails, setUserDetails] = useState<IUserProfile | null>(null);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        console.log("error", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, []);

  // fetch user country
  useEffect(() => {
    if (!userDetails || !userDetails.country) {
      return;
    }

    const fetchCountryName = async () => {
      try {
        const response = await axios.get(`${userDetails.country}`);
        setUserCountry(response.data.name);
      } catch (e) {
        console.log("error", e);
      }
    };

    fetchCountryName();
  }, [userDetails]);

  const renderDetails = () => {
    if (!userDetails) {
      return null;
    }

    const {
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
      verified
    } = userDetails;

    const joinedDate = new Date(joined * 1000);

    return (
      <>
        <div>userCountry: {userCountry}</div>
        <div>followers{followers}</div>
        <div>isStreamer: {isStreamer.toString()}</div>
        <div>
          joined:
          {joinedDate.getDate() + "/" + (joinedDate.getMonth() + 1) + "/" + joinedDate.getFullYear()}
        </div>
        <div>
          lastOnline: <HoursSinceLastLogin lastOnline={lastOnline} />
        </div>
        <div>league: {league}</div>
        <div>playerId: {playerId}</div>
        <div>status: {status}</div>
        <div>
          Streaming Platforms:
          {streamingPlatforms.length > 0
            ? streamingPlatforms.map((platform, index) => {
              return (
                <span key={index}>{(index ? ", " : "") + platform}</span>
              );
            })
            : "None"}
        </div>
        <div>title: {title}</div>
        <div>url: {url}</div>
        <div>verified: {verified.toString()}</div>
      </>
    );
  };

  return (
    <>
      <h1>Profile</h1>
      <div>{renderDetails()}</div>
    </>
  );
}

export default Profile;
