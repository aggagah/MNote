// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Help from "./pages/Help";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Search from "./pages/Search";
// import Settings from "./pages/Settings";
// import Summary from "./pages/Summary";

function App() {
    return (
        <Router>
            {/* <Sidebar /> */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/mnote/*" element={<Homepage />} />
                {/* <Route path="/summary" element={<Homepage />} />
                <Route path="/search" element={<Homepage />} />
                <Route path="/settings" element={<Homepage />} />
                <Route path="/help" element={<Homepage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
