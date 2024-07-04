import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertSlice"; 
import { useDispatch } from "react-redux";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/users/login", user);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("User Login Successfully");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error occured",error);
    }
  };
  return (
    <div className="authentication">
        <div className="authentication-form p-5">
        <h1 className="card-title">Login to HealthEasy</h1>
        <input
          className="input mt-3"  
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br/>
        <input
          className="input mt-3"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br/>
        <button className="primary-button mt-3" onClick={login}>
          Login
        </button>
        <br/>
        <Link to="/register" className="anchor mt-2">
          Click here to Register
        </Link>
        </div>

    </div>
  );
}

export default Login;
