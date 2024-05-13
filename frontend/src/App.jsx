import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Doacoes from "./pages/publico/Doacoes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="AppContent">
      
      <Navbar />



    </div>
  );
}

export default App;
