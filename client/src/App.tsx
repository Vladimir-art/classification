import React from "react";
import logo from "./logo.svg";
import "./components/Antigravity"
import "./App.css";
import Header from "./components/Header";

function App() {
  // React.useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = "./components/Antigravity/index.js";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
