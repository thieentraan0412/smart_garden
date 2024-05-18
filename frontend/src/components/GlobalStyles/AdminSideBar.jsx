import React, { useState } from "react";
import logo from "../../assets/logo_all.png";
import user from "../../assets/users.png";
import request from "../../assets/request.png";
import active_user from "../../assets/users-active.png";
import active_request from "../../assets/request-active.png";
// import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import styles from './SideBar.module.scss';
import { NavLink } from "react-bootstrap";
function SideBar(props) {
    const sbstyle = {
        backgroundColor: '#3D3972',
        height: '100vh',
        textDecoration: "none"
    }

    const linkStyle = {
        textDecoration: "none",
        color: 'white'
    };


    const postion = props.position
    const userLogo = (postion == "user") ? active_user : user;
    const requestLogo = (postion == "request") ? active_request : request;

    const navigate = useNavigate()
    return (
        <div className="side-bar col-xl-3 col-md-3 container p-auto" style={sbstyle}>
            <img className="admin-logo img-fluid mx-auto d-block py-5" src={logo}></img>

            <div className="my-5 mx-5">
                <Link to="/admin" style={linkStyle}>
                    <h6 className="d-flex align-items-center">
                        <img src={userLogo} className="pe-3 admin-user-icon"></img>
                        Quản lý khách hàng
                    </h6>
                </Link>
            </div>
            <div className="my-5 mx-5">
                <Link to="/admin/request" style={linkStyle}>
                    <h6 className="d-flex align-items-center">
                        <img src={requestLogo} className="pe-3 admin-request-icon"></img>
                        Quản lý yêu cầu
                    </h6>
                </Link>
            </div>
            {/* <div className="my-5 mx-5">
                <Link to="/admin/device" style={linkStyle}>
                    <h6 className="d-flex align-items-center">
                        <img src={deviceLogo} className="pe-3 admin-cloud-icon"></img>
                        Quản lý thiết bị
                    </h6>
                </Link>
            </div> */}
            <hr className="w-75 mx-auto" />
            <div
                className="logout text-center mt-5"
                onClick={() => navigate('/')}
            >Đăng xuất</div>
        </div>
    );
}

export default SideBar;