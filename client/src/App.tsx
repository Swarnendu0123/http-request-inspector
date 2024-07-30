import "./App.css";
import "./assets/css/loder.css"
import UrlGenerator from "./components/UrlGenerator.component";
import Navbar from "./components/Navbar.component";
import HomeRoute from "./routes/Home.route";


function App() {
  return (
    <div className="text-white bg-black">
      <Navbar />
      <UrlGenerator />
      <HomeRoute />
    </div>
  );
}

export default App;
