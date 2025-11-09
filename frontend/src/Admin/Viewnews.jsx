import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
const Adnews = () => {
    const navigate = useNavigate();
    function validation() {
        const data = localStorage.getItem("admin");
        if (data != "admin@gmail.com") {
        navigate("/admin");
        }
    }
    useEffect(() => {
        validation();
    });

    return (
        <>
        <div className="row" style={{ height: "8vh", background: "#d4cdcdff" }}>
            <div className="col-4 my-auto">
            <h4>Admin Dashboard</h4>
            </div>
            <div className="col-4 pe-2 my-auto ms-auto text-end">
            <button
                onClick={() => {
                localStorage.removeItem("admin");
                validation();
                }}
                className="btn btn-sm btn-outline-danger"
            >
                Logout
            </button>
            </div>
        </div>

        <div
            className="row p-4"
            style={{ height: "92vh", background: "#949292ff" }}
        >
            <div className="col-2 h-100 pe-5 " style={{ overflow: "auto" }}>
            <Adsidenav></Adsidenav>
            </div>
            <div
            className="col-10 h-100 msauto bg-light rounded-4 shadow-lg"
            style={{ overflow: "auto" }}
            >
            <h4 className="my-5 text-center">View News</h4>

            
            </div>
        </div>
        </>
    );
};

export default Adnews;
