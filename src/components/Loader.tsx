import { ClipLoader } from "react-spinners";

import "./loader.css";

function Loader() {
  return (
    <div className="loader">
      <ClipLoader color="white" size={60} />
    </div>
  );
}

export default Loader;
