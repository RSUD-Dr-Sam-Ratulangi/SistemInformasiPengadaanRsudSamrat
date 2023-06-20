import * as React from "react";
import axios from "axios";
import {
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../config/auth/authSlice";
import logo128 from "../assets/images/logo128.png";
import vector from "../assets/images/vector.svg";

const SignInpages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  const handleChangeUsername = (e) => {
    setUsernameInput(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await axios.post(
        "http://rsudsamrat.site:8080/employee/login",
        {
          username: usernameInput,
          password: passwordInput,
        }
      );

      const { username, id } = loginResponse.data;
      const userResponse = await axios.get(
        `http://rsudsamrat.site:8080/employee/${id}`
      );
      const { role } = userResponse.data;
      console.log(id);
      dispatch(login({ username, id, role }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Vector BG */}
      <img
        src={vector}
        alt="bg"
        className="absolute w-screen -translate-x-1/2 -translate-y-1/2 pointer-events-none user-select-none left-1/2 top-1/2"
      />

      {/* Form */}
      <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-max">
        <div className="mb-3">
          <img src={logo128} alt="Logo" />
        </div>
        <h1 className="m-0 fs-4 fw-bold">Smart Samrat Procurement</h1>
        <p className="fs-6 fw-medium">RSUD DR SAM RATULANGI TONDANO</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="username">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={usernameInput}
              onChange={handleChangeUsername}
              placeholder="Username"
              className="w-full input input-primary"
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="password">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={passwordInput}
              onChange={handleChangePassword}
              placeholder="•••••••"
              className="w-full input input-primary"
            />
          </div>
          <div className="flex items-center justify-start gap-2 mb-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              id="remember"
            />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <button type="submit" className="w-full btn btn-success">
            Sign in
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 flex flex-col items-center justify-between w-full p-6 md:flex-row">
        <div className="mb-2 text-center">
          © 2023 UPTI RSUD DR SAM RATULANGI TONDANO. Hak Cipta Dilindungi
        </div>
        <div className="flex gap-3">
          <a
            href="https://instagram.com/rsud_samrat_tondano?igshid=OGQ5ZDc2ODk2ZA=="
            className="text-dark"
          >
            <FaInstagram className="scale-125" />
          </a>
          <a
            href="https://www.facebook.com/PageOfficialRSUDSamRatulangi?mibextid=LQQJ4d"
            className="text-dark"
          >
            <FaFacebook className="scale-125" />
          </a>
          <a href="https://rsudsamrat.site/epasien/" className="text-dark">
            <FaGlobe className="scale-125" />
          </a>
          <a href="mailto:samratulangirsud@gmail.com" className="text-dark">
            <FaEnvelope className="scale-125" />
          </a>
          <a href="https://goo.gl/maps/dcuTHTNYtmFDfkxA7" className="text-dark">
            <FaMapMarkerAlt className="scale-125" />
          </a>
        </div>
      </div>
    </>
  );
};

export default SignInpages;
