import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../api/auth.api";
import "../styles/Register.css";

function Register() {
    const [state, setState] = useState({
        email: "",
        phone: "",
        fullname: "",
        password: "",
    });

    const [status, setStatus] = useState();

    const change = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        baseApi
            .post("signup", {
                email: state.email,
                phone: state.phone,
                fullname: state.fullname,
                password: state.password,
            })
            .then((response) => {
                if (response.data.message.includes("email:")) {
                    // check for duplicate email
                    setStatus("Email already used");
                } else if (response.data.message.includes("phone:")) {
                    // check for duplicate phone number
                    setStatus("Phone number already used");
                } else if (
                    response.data.message === "password can not be empty"
                ) {
                    setStatus("Password field must not empty");
                } else if (
                    response.data.message === "Success add user to database"
                ) {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error(err);
                console.clear();
            });

        setState({
            email: "",
            phone: "",
            fullname: "",
            password: "",
        });
    };

    return (
        <div className="register-page">
            <div className="center">
                <form className="register" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="name-phone">
                        <div className="name">
                            <label htmlFor="fullname">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="fullname"
                                value={state.fullname}
                                onChange={change}
                                autoComplete="off"
                            />
                        </div>

                        <div className="phone">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter your phone"
                                name="phone"
                                value={state.phone}
                                onChange={change}
                                autoComplete="off"
                            />
                        </div>
                    </div>
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
                    <button type="submit">REGISTER</button>
                    <p>
                        Already have an account? <a href="/">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
