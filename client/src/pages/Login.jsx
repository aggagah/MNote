import React from "react";
import { useState } from "react";
import baseApi from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [status, setStatus] = useState();

    const change = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        baseApi
            .post("signin", {
                email: state.email,
                password: state.password,
            })
            .then((response) => {
                if (response.data.message === "Wrong password") {
                    setStatus("incorrect password");
                } else if (response.data.message === "User not found") {
                    setStatus("No user registered with this email");
                } else {
                    let user = response.data.data._id;
                    localStorage.setItem("user", user);
                    navigate("/mnote");
                }
            })
            .catch((err) => {
                console.error(err);
                console.clear();
            });
        setState({
            email: "",
            password: "",
        });
    };

    return (
        <div className="login-page">
            <div className="left">
                <h1>MNote</h1>
            </div>
            <div className="right">
                <form className="login" onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="email">
                        <p>{status}</p>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                            value={state.email}
                            onChange={change}
                            autoComplete="off"
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={state.password}
                            onChange={change}
                        />
                    </div>
                    <button type="submit">LOGIN</button>
                    <p>
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
