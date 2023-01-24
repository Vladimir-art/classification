import React, { useEffect, useState } from "react";
import "./components/Antigravity";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import classificationRequest from "./utils/fetch";

export interface IImageData {
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
}

function App() {
  const [imageData, setImageData] = useState<IImageData>();
  const [classificationResult, setClassificationResult] = useState();
  const [isLoading, setIsLoading] = useState<boolean>();

  const fetchClassification = async (imageData: IImageData) => {
    console.log('imageData ',imageData)
    const result = await classificationRequest.post("/", imageData);
    console.log("result ", result);
    setClassificationResult(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!imageData) return;
    fetchClassification(imageData);
  }, [imageData]);

  return (
    <div className="App">
      <Header />
      <Main
        setImageData={setImageData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Footer />
    </div>
  );
}

export default App;
