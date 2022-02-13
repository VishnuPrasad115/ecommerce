import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const BASE_URL = "http://13.235.87.215:4000";

function Home() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const data = {
      token: localStorage.getItem("token"),
    };
    axios
      .post(BASE_URL + "/api/v1/category/all", data)
      .then(function (response) {
        if (response.data.success) {
          setCategoryList(response.data.categories);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div id="homePage">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Home;
