import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  GRANDMASTERS_LIST_API_URL,
  profilePathName,
} from "../../libraries/constants";
import Pagination from "../Pagination";
import Loader from "../Loader";
import Header from "../Header";

import "./list-of-grandmasters.css";

function ListOfGrandmasters() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [grandmastersList, setGrandmastersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Calculation for pagination
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItemsToBeDisplayed = grandmastersList.slice(
    firstItemIndex,
    lastItemIndex,
  );
  const numPages = Math.ceil(grandmastersList.length / itemsPerPage);

  useEffect(() => {
    const fetchGrandmasters = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${GRANDMASTERS_LIST_API_URL}`);
        setGrandmastersList(response.data.players);
      } catch (e) {
        console.log(e); // Send to Sentry or another error tracking service
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrandmasters();
  }, []);

  return (
    <>
      <Header
        title={"Grandmasters"}
        imageSrc="/chess.png"
        altForImage={"Pieces of a chess"}
      />
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <ul className="list">
              {currentItemsToBeDisplayed.map((player, index) => (
                <li key={index}>
                  <Link className="username" to={profilePathName(player)}>
                    <span className="name">{player}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Pagination
              totalNumberPages={numPages}
              setCurrentPageCallback={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ListOfGrandmasters;
