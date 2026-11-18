import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      const token = res.data.token;
      const role = res.data.role;
      const userId = res.data.userId;
      console.log(role);
      console.log("Login Successfull");
      if (!token || !role) {
        setError("Invalid username or password");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      console.log(userId);
      setSuccess("Login Successfull!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };
  return (
    <div className="bg-slate-600 min-h-screen flex flex-col bg-[url('/back.png')] bg-cover bg-no-repeat">
      <p className="absolute text-white text-4xl font-bold top-25 w-full text-center">
        Tutor Application System
      </p>
      <div className=" absolute inset-0 flex flex-1 items-center justify-center ">
        <div className="login-frm h-70">
          <p className="mb-3 font-bold text-2xl text-white">Login</p>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={username}
              required
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="inp"
            />
            <input
              type="password"
              value={password}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="inp"
            />
            <button type="submit" className="sub-btn cursor-pointer">
              <FiLogIn />
              Login
            </button>
            {errors && <p className="text-red-500 font-medium">{errors}</p>}
            {success && <p className="text-green-500 font-medium">{success}</p>}
            <div className="text-white mt-2">
              not a user?{" "}
              <Link to="/register" className="font-bold hover:text-white/60">
                register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
