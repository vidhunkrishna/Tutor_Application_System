import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setError] = useState("");
  const role = "GUEST";
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:8080/auth/register", {
        username,
        email,
        password,
        phonenumber,
        role,
      });
      console.log(data);
      setError("");
      setSuccess("Registered successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Registration failed try again.");
    }
  };
  return (
    <div className="bg-slate-600 min-h-screen flex flex-col bg-[url('/back.png')]">
      <p className="absolute text-white text-4xl font-bold top-25 w-full text-center">
        Tutor Application System
      </p>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <form className="login-frm h-90" onSubmit={handlesubmit}>
          <p className="mb-3 font-bold text-2xl text-white">Register</p>
          <input
            className="inp"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="inp"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inp"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="inp"
            placeholder="Enter your phonenumber"
            type="text"
            value={phonenumber}
            max={10}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="sub-btn cursor-pointer" type="submit">
            Register
          </button>
          {errors && <p className="text-red-500 font-medium">{errors}</p>}
          {success && <p className="text-green-500 font-medium">{success}</p>}
          <div className="text-white mt-2">
            already a user?{" "}
            <Link to="/login" className="font-bold hover:text-white/60">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
