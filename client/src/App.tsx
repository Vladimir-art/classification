import "./App.css";
import "./components/Antigravity";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import classificationRequest from "./utils/fetch";
import WelcomePage from "./components/WelcomeScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import { store } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import axios from "axios";
import { loginUrl } from "./utils/constants";
import { setUser } from "./redux/authSlice";

export interface IImageData {
  imageData: Uint8ClampedArray;
  width: number;
  height: number;
}

function App() {
  const [imageData, setImageData] = useState<IImageData | undefined>();
  const [classificationResult, setClassificationResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchClassification = async (imageData: IImageData) => {
    const result = await classificationRequest.post("/", imageData);
    setClassificationResult(result.data);
    setIsLoading(false);
    setImageData(undefined);
  };

  useEffect(() => {
    const getUser = async () => {
      axios(`${loginUrl}/login/success`, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
          throw new Error("authentication has been failed!");
        })
        .then((res) => {
          dispatch(setUser(res.data));
          navigate("/classification");
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!imageData) return;
    fetchClassification(imageData);
  }, [imageData]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {isAuthenticated && (
          <Route
            path="/classification"
            element={
              <>
                <Header />
                <Main
                  user={user}
                  setImageData={setImageData}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  classificationResult={classificationResult}
                />
                <Footer />
              </>
            }
          />
        )}
      </Routes>
      <Login />
      <Register />
    </div>
  );
}

export default App;
