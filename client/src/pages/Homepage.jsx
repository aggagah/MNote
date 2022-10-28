import React from "react";
import Sidebar from "../components/Sidebar";

function Homepage() {
    return (
        <div className="homepage" style={{ width: "100vw", display: "flex" }}>
            <Sidebar />
        </div>
    );
}

export default Homepage;
