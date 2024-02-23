import "./App.css";
import UrlGnerator from "./components/UrlGnerator.component";
import Navbar from "./components/Navbar.component";
import HomeRoute from "./routes/Home.route";
import React from "react";

function App() {
  return (
    <div className="text-white bg-black">
      <Navbar />
      <UrlGnerator />
      <HomeRoute />
    </div>
  );
}

export default App;
