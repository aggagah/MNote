import React, { useState } from "react";
import { useEffect } from "react";
import userApi from "../api/user.api";
import "../styles/Settings.css";

function Settings() {
    const [state, setState] = useState({
        _id: "",
        fullname: "",
        email: "",
        phone: "",
        password: "",
    });

    const change = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const getData = (e) => {
        e.preventDefault();
        userApi
            .post("getuserbyname", {
                fullname: localStorage.getItem("user"),
            })
            .then((response) => {
                setState({
                    _id: response.data._id,
                    fullname: response.data.fullname,
                    email: response.data.email,
                    phone: response.data.phone,
                    password: response.data.password,
                });
            });
    };

    const updateUser = () => {
        userApi.put("updateuser", {
            _id: state._id,
            fullname: state.fullname,
            email: state.email,
            phone: state.phone,
            password: state.password,
        });
        localStorage.setItem("user", state.fullname.toUpperCase());
        setState({
            _id: "",
            fullname: "",
            email: "",
            phone: "",
            password: "",
        });
    };

    return (
        <div className="settings-page">
            <h1 className="title">Account Settings</h1>
            <div className="container-form">
                <form className="update-data" onSubmit={updateUser}>
                    <button onClick={getData} type="submit">
                        View Data
                    </button>
                    <div className="fullname">
                        <label htmlFor="fullname">Fullname</label>
                        <input
                            type="text"
                            name="fullname"
                            onChange={change}
                            value={state.fullname}
                        />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={state.email}
                            onChange={change}
                        />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={state.phone}
                            onChange={change}
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="leave it blank to keep the current pass"
                            onChange={change}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Settings;
