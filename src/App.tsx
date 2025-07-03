import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import ListOfGrandmasters from "./components/ListOfGrandmasters/ListOfGrandmasters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfGrandmasters />}></Route>
        <Route path="/user/:username" element={<UserProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
