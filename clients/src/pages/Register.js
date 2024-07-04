import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const register = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/users/register", user);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
;      toast.error("Error occure",error);
    }
  };
  return (
    <div className="authentication">
        <div className="authentication-form p-5">
        <h1 className="card-title">Welcome to HealthEasy</h1>
        <input
          className="input mt-3"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <br/>
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
        <button className="primary-button mt-3" onClick={register}>
          Register
        </button>
        <br/>
        <Link to="/login" className="anchor mt-2">
          Already Have Account ? Login
        </Link>
        </div>
        
    </div>
  );
}

export default Register;
