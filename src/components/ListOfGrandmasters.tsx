import { useEffect, useState } from "react";
import axios from "axios";
import {
  GRANDMASTERS_LIST_API_URL,
  profilePathName
} from "../libraries/constants";
import { useNavigate } from "react-router-dom";

function ListOfGrandmasters() {
  const [isLoading, setIsLoading] = useState(false);
  const [grandmastersList, setGrandmastersList] = useState([]);

  const navigate = useNavigate();

  // fetch the list of grandmasters
  // use pagination
  useEffect(() => {
    const fetchGrandmasters = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${GRANDMASTERS_LIST_API_URL}`);
        console.log(response.data);
        setGrandmastersList(response.data.players);
      } catch (e) {
        console.log("error", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrandmasters();
  }, []);

  const handleClick = (playerUsername: string) => {
    // redirect user to the profile page
    console.log("click user name", playerUsername);
    navigate(profilePathName(playerUsername));
  };

  // add loading here and fix the page
  return (
    <>
      <h1>List of grandmasters</h1>
      {grandmastersList.map((player, index) => {
        return (
          <button
            key={index}
            onClick={() => handleClick(player)}
          >
            {player}
          </button>
        );
      })}
    </>
  );
}

export default ListOfGrandmasters;
