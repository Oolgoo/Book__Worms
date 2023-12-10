import React, { useState, useContext } from "react";
import Home from "./pages/home";
import { Route, Routes, Navigate } from "react-router-dom";
import AddItem from "./pages/addItem";
import "antd/dist/antd.min.css";
import Login from "./pages/login";
import Register from "./pages/register";
import MyProducts from "./pages/myProducts";
import Header from "./components/header";
import Footer from "./components/footer";
import ProductDetail from "./pages/ProductDetail";
import { AuthContext } from "../src/context/AuthContext";

function App() {
  const [catVal, setCatVal] = useState("all");
  const onChange = (e) => {
    setCatVal(e);
  };

  const { currentUser } = useContext(AuthContext);

  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  };
  return (
    <div>
      {currentUser && <Header user={currentUser?.email} onChange={onChange} />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequiredAuth>
              <Home catVal={catVal} />
            </RequiredAuth>
          }
        />
        <Route
          exact
          path="/addItem"
          element={
            <RequiredAuth>
              <AddItem />
            </RequiredAuth>
          }
        />
        <Route
          exact
          path="/productDetail/:id"
          element={
            <RequiredAuth>
              <ProductDetail />
            </RequiredAuth>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/myProducts"
          element={
            <RequiredAuth>
              <MyProducts />
            </RequiredAuth>
          }
        />
      </Routes>
      {currentUser && <Footer />}
    </div>
  );
}

export default App;
