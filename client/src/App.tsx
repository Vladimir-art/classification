import React, { useEffect, useState } from "react";
import "./components/Antigravity";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import classificationRequest from "./utils/fetch";
import WelcomePage from "./components/WelcomeScreen";
import Login from "./components/Login";

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
      <Login />
      <WelcomePage />
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
