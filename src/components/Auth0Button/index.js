import { useAuth0 } from "@auth0/auth0-react";

const Auth0Button = () => {
  const { loginWithRedirect } = useAuth0();
  const loginUser = async () => {
    try {
      await loginWithRedirect();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button className="btn btn-primary auth0-button" onClick={loginUser}>
      Log In with Auth0
    </button>
  );
};
export default Auth0Button;
