import "./App.css";
import HomeRoute from "./components/Home.component";
import UrlGnerator from "./components/UrlGnerator.component";
import Navbar from "./components/Navbar.component";

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
