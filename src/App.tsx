import { BrowserRouter, Route, Routes } from "react-router-dom";

import Profile from "./components/Profile";
import ListOfGrandmasters from "./components/ListOfGrandmasters";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ListOfGrandmasters />}
        ></Route>
        <Route
          path="/user/:username"
          element={<Profile />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;