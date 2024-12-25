//library
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// component
import SignInPage from "./component/SignInPage";
import SignUpPage from "./component/SignUpPage";
//
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/logIn" element={<SignInPage></SignInPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
