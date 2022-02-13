import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Navbar = () => {
  const logoutFn = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    logout({ returnTo: window.location.origin });
    window.location.href = "/";
  };

  const [username, setUsername] = useState("User");
  const { user, logout } = useAuth0();
  const setUserData = async () => {
    localStorage.setItem("username", user.given_name);
    localStorage.setItem("userId", user.sub);
    setUsername(localStorage.getItem("username"));
  };
  useEffect(() => {
    if (user) {
      setUserData();
    } else if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
  }, [user]);

  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div className="header-wrapper d-flex justify-content-between">
            <div className="logo d-inline-block">
              <Link className="text-decoration-none" to={"/home"}>
                Ecommerce
              </Link>
            </div>
            <div className="user-actions d-flex flex-row">
              <Link className="text-decoration-none" to={"/home/account"}>
                Account
              </Link>
              <Link className="text-decoration-none" to={"/home/cart"}>
                Cart
              </Link>
              <div className="user-intro">Hi {username}</div>
              <div className="logout-btn" onClick={logoutFn}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
