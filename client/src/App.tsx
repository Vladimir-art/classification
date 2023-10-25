import "./App.css";
import "./components/Antigravity";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import classificationRequest from "./utils/fetch";
import WelcomePage from "./components/WelcomeScreen";
import Login from "./components/Login";
import Register from "./components/Register";

export interface IImageData {
  imageData: Uint8ClampedArray;
  width: number;
  height: number;
}

function App() {
  const [imageData, setImageData] = useState<IImageData | undefined>();
  const [classificationResult, setClassificationResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const fetchClassification = async (imageData: IImageData) => {
    const result = await classificationRequest.post("/", imageData);
    setClassificationResult(result.data);
    setIsLoading(false);
    setImageData(undefined);
  };

  useEffect(() => {
    if (!imageData) return;
    fetchClassification(imageData);
  }, [imageData]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/classification"
          element={
            <>
              <Header />
              <Main
                setImageData={setImageData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                classificationResult={classificationResult}
              />
              <Footer />
            </>
          }
        />
      </Routes>
      <Login />
      <Register />
      

      {/* <Header />
      <Main
        setImageData={setImageData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        classificationResult={classificationResult}
      />
      <Footer /> */}
    </div>
  );
}

export default App;
