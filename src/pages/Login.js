import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/login.css';
import { Link, useNavigate } from "react-router-dom";
import Auth0Button from "../components/Auth0Button";
import { useAuth0 } from "@auth0/auth0-react";
import { checkUser } from "../service/auth";

const BASE_URL = 'http://13.235.87.215:4000';

function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();
    const { user, } = useAuth0();
    const loginFn = () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        const data = {
            username: username.value,
            password: password.value
        };
        axios.post(BASE_URL + '/api/v1/user/login', data)
            .then(function (response) {
                if (response.data.success) {
                    localStorage.setItem("username", response.data.data.username)
                    localStorage.setItem("userId", response.data.data.userId);
                    localStorage.setItem("token", response.data.data.token);
                    navigate("/home");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {
        if (user) {
            checkUserAlreadyExist()
        }
      }, [user]);

      const checkUserAlreadyExist = async()=>{
        let response = await checkUser({
            username: user.nickname, 
            password: user.sub
        })
        if(response.status === 'success') {
            localStorage.setItem("username", response.data.data.username)
            localStorage.setItem("userId", response.data.data.userId);
            localStorage.setItem("token", response.data.data.token);
            navigate("/home");
        }
      }
    const signupFn = () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        const data = {
            username: username.value,
            password: password.value
        };

        axios.post(BASE_URL + '/api/v1/user/signup', data)
            .then(function (response) {
                if (response.data.success) {
                    localStorage.setItem("username", response.data.data.username)
                    localStorage.setItem("userId", response.data.data.userId);
                    localStorage.setItem("token", response.data.data.token);
                    navigate("/home");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup);
    }

    return (
        <div id="loginPage">
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="header-wrapper d-flex justify-content-between">
                            <div className="logo d-inline-block">
                                <Link className="text-decoration-none" to={"/"}>Ecommerce</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="home-title text-center">Welcome to Ecommerce</h2>
                        {
                            !showSignup ? (
                                <div className="login-wrapper">
                                    <h4 className="text-center">Login</h4>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Username" id="username" />
                                    </div>
                                    <div className="input-group">
                                        <input type="password" className="form-control" placeholder="Password" id="password" />
                                    </div>
                                    <div className="input-group">
                                        <input type="submit" className="form-control btn btn-primary" value="Log in as User" onClick={loginFn} />
                                    </div>
                                    <div className="auth0-button-container">
                                        <Auth0Button/>
                                    </div>
                                    <div className="signup-btn text-center text-info" onClick={toggleSignup}>Dont have an Account ? Signup</div>
                                    <div className="auth-error-msg text-danger text-center"></div>
                                </div>
                            ) : (
                                <div className="login-wrapper">
                                    <h4 className="text-center">Signup</h4>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Username" id="username" />
                                    </div>
                                    <div className="input-group">
                                        <input type="password" className="form-control" placeholder="Password" id="password" />
                                    </div>
                                    <div className="input-group">
                                        <input type="submit" className="form-control btn btn-primary" value="Sign up as User" onClick={signupFn} />
                                    </div>
                                    <div className="signup-btn text-center text-info" onClick={toggleSignup}>Already have an Account ? Login</div>
                                    <div className="auth-error-msg text-danger text-center"></div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;