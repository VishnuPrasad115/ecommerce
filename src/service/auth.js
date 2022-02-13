import axios from "axios";

const BASE_URL = "http://13.235.87.215:4000";

export const login = async (data) => {
  try {
    let res = await axios.post(BASE_URL + "/api/v1/user/login", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const signupFn = async (data) => {
  try {
    let res = await axios.post(BASE_URL + "/api/v1/user/signup", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const checkUser = async (data) => {
  try {
    let res = await login(data);

    if (res.data.msg === "Invalid Email or Password") {
      await signupFn(data);
      console.log(res);
    }
    return {
      status: "success",
      data: res.data,
    };
  } catch (err) {
    console.log(err.message);
  }
};
