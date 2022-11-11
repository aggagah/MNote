import React from "react";
import { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Help from "../pages/Help";
import Search from "../pages/Search";
import Settings from "../pages/Settings";
import Summary from "../pages/Summary";
import "../styles/Sidebar.css";

function Sidebar() {
    const [path, setPath] = useState("");

    const handlePath = () => {
        setPath(window.location.pathname);
    };

    return (
        <>
            <div className="topnav">
                <div className="text-wrapper">
                    <h1 className="logo-title">MNote</h1>
                    <h1 className="user">{localStorage.getItem("user")}</h1>
                </div>
            </div>
            <div className="sidenav">
                <ul className="sidenav-ul">
                    <Link
                        to="/mnote"
                        onClick={handlePath}
                        style={{ textDecoration: "none" }}
                    >
                        <li
                            className="sidenav-li"
                            id={
                                window.location.pathname === "/mnote"
                                    ? "active"
                                    : ""
                            }
                        >
                            Dashboard
                        </li>
                    </Link>
                    <Link
                        to="/mnote/summary"
                        onClick={handlePath}
                        style={{ textDecoration: "none" }}
                    >
                        <li
                            className="sidenav-li"
                            id={
                                window.location.pathname === "/mnote/summary"
                                    ? "active"
                                    : ""
                            }
                        >
                            Summary
                        </li>
                    </Link>
                    <Link
                        to="/mnote/search"
                        onClick={handlePath}
                        style={{ textDecoration: "none" }}
                    >
                        <li
                            className="sidenav-li"
                            id={
                                window.location.pathname === "/mnote/search"
                                    ? "active"
                                    : ""
                            }
                        >
                            Search
                        </li>
                    </Link>
                    <Link
                        to="/mnote/settings"
                        onClick={handlePath}
                        style={{ textDecoration: "none" }}
                    >
                        <li
                            className="sidenav-li"
                            id={
                                window.location.pathname === "/mnote/settings"
                                    ? "active"
                                    : ""
                            }
                        >
                            Settings
                        </li>
                    </Link>
                    <Link
                        to="/mnote/help"
                        onClick={handlePath}
                        style={{ textDecoration: "none" }}
                    >
                        <li
                            className="sidenav-li"
                            id={
                                window.location.pathname === "/mnote/help"
                                    ? "active"
                                    : ""
                            }
                        >
                            Help
                        </li>
                    </Link>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
            </Routes>
        </>
    );
}

export default Sidebar;
