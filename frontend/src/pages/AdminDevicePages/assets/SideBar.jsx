import React, { useState } from "react";
import logo from "../assets/admin-logo.png";
import user from "../assets/users.png";
import request from "../assets/request.png";
import device from "../assets/frame.png";
import active_user from "../assets/users-active.png";
import active_request from "../assets/request-active.png";
import active_device from "../assets/frame-active.png";
import coconut from "../assets/coconut.webp";
import classNames from 'classnames/bind';

import styles from './SideBar.module.scss';
const cx = classNames.bind(styles);

function SideBar() {
    const [userLogo, setUserLogo] = useState(active_user);
    const [requestLogo, setRequestLogo] = useState(request);
    const [deviceLogo, setDeviceLogo] = useState(device);
    function handleMangeUser() {
        setUserLogo(userLogo => active_user);
        setRequestLogo(requestLogo => request);
        setDeviceLogo((deviceLogo) => device);
    }
    function handleManageRequest() {
        setUserLogo(userLogo => user);
        setRequestLogo(requestLogo => active_request);
        setDeviceLogo((deviceLogo) => device);
    }
    function handleMangeDevice() {
        setUserLogo(userLogo => user);
        setRequestLogo(requestLogo => request);
        setDeviceLogo((deviceLogo) => active_device);
    }
    return (
        <div className="col-xl-2 col-md-2 side-bar container p-auto">
            <img className="admin-logo img-fluid mx-auto d-block py-5" src={logo}></img>
            <div className="my-5 mx-5">
                <h6 onClick={handleMangeUser} className="d-flex align-items-center">
                    <img src={userLogo} className="pe-3 admin-user-icon"></img>
                    Quản lý khách hàng
                </h6>
            </div>
            <div className="my-5 mx-5">
                <h6 onClick={handleManageRequest} className="d-flex align-items-center">
                    <img src={requestLogo} className="pe-3 admin-request-icon"></img>
                    Yêu cầu
                </h6>
            </div>
            <div className="my-5 mx-5">
                <h6 onClick={handleMangeDevice} className="d-flex align-items-center">
                    <img src={deviceLogo} className="pe-3 admin-cloud-icon"></img>
                    Quản lí thiết bị
                </h6>
            </div>
            <hr className="w-75 mx-auto" />
            <div className="logout text-center mt-5">Đăng xuất</div>
        </div>
    );
}

export default SideBar;