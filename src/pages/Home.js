import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import '../styles/home.css';

const BASE_URL = 'http://13.235.87.215:4000';

function Home() {
    const [categoryList, setCategoryList] = useState([]);
    const [username, setUsername] = useState('User');
    const navigate = useNavigate();

    const logoutFn = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        const data = {
            token: localStorage.getItem("token")
        }
        axios.post(BASE_URL + '/api/v1/category/all', data)
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
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/home"}>Ecommerce</Link>
                            </div>
                            <div className="user-actions d-flex flex-row">
                                <Link className="text-decoration-none" to={"/home/account"}>Account</Link>
                                <Link className="text-decoration-none" to={"/home/cart"}>Cart</Link>
                                <div className="user-intro">Hi {username}</div>
                                <div className="logout-btn" onClick={logoutFn}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Outlet/>
        </div>
    )
}

export default Home;