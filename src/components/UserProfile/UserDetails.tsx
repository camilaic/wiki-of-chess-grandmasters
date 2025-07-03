// @ts-ignore need this for tests to pass
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import HoursSinceLastLogin from "./HoursSinceLastLogin";

import "./user-details.css";

interface UserDetails {
  avatar: string;
  country: string;
  followers: number;
  joined: number;
  lastOnline: number;
  name?: string;
}

function UserDetails(props: UserDetails) {
  const [userCountry, setUserCountry] = useState<string | null>(null);

  const { avatar, country, followers, joined, lastOnline, name } = props;
  const joinedDate = new Date(joined * 1000);

  // The API returns a URL for the country, and we fetch it to get the name
  useEffect(() => {
    if (!country) {
      return;
    }

    const fetchCountryName = async () => {
      try {
        const response = await axios.get(`${country}`);
        setUserCountry(response.data.name);
      } catch (e) {
        console.log("error", e);
      }
    };
    fetchCountryName();
  }, []);

  return (
    <div className="profile-container">
      <img
        src={avatar || "/chess-player.png"}
        alt="User avatar"
        width="100"
        height="100"
        className="avatar"
      />

      <div className="info-container">
        <div className="profile">
          {name && <div>Name: {name}</div>}
          {country && <div>Country : {userCountry}</div>}
        </div>
        <div className="info-bottom">
          <div>Followers: {followers}</div>
          <div>
            Joined date:
            {` ${joinedDate.getDate()}/${joinedDate.getMonth() + 1}/${joinedDate.getFullYear()}`}
          </div>
          <div>
            Last online: <HoursSinceLastLogin lastOnline={lastOnline} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
