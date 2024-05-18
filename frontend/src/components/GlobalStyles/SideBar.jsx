import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/admin-logo.png";
import user from "../../assets/users.png";
import request from "../../assets/request.png";
import device from "../../assets/frame.png";
import active_user from "../../assets/users-active.png";
import active_request from "../../assets/request-active.png";
import active_device from "../../assets/frame-active.png";
import logo2 from "../../assets/logo_all.png"
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideBar.module.scss';
import { NavLink } from "react-bootstrap";
const cx = classNames.bind(styles);

function SideBar(props) {
    const sbstyle = {
        backgroundColor: '#3D3972',

        height: '100vh'
    }
    const logoutStyle = {
        cursor: 'pointer'
    }
    const [userLogo, setUserLogo] = useState(user);
    const [requestLogo, setRequestLogo] = useState(request);
    const [deviceLogo, setDeviceLogo] = useState(device);
    //position: sensor,garden,notify
    useEffect(()=>{
        if(props.position=="sensor") setUserLogo(active_user);
        if(props.position=="garden") setRequestLogo(active_request);
        if(props.position=="notify") setDeviceLogo(active_device);
    },[])
    const navigate = useNavigate()
    function handleMangeUser() {
        navigate(`/${props.account}/ManageSensor`)
    }
    function handleManageRequest() {
        navigate(`/${props.account}`)
    }
    function handleMangeDevice() {
        navigate(`/${props.account}/NotificationPage`)
    }

    const linkStyle = {
        textDecoration: "none",
        color: 'white'
    };
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className="side-bar col-xl-3 col-md-3 container p-auto" style={sbstyle}>
            <img className="admin-logo img-fluid mx-auto d-block py-5" src={logo2}></img>

            <div className="my-5 mx-5">
                <h6 className="d-flex align-items-center" onClick={handleMangeUser}>
                    <img src={userLogo} className="pe-3 admin-user-icon"></img>
                    Quản lý sensor
                </h6>
            </div>
            <div className="my-5 mx-5">
                <h6 className="d-flex align-items-center" onClick={handleManageRequest}>
                    <img src={requestLogo} className="pe-3 admin-request-icon"></img>
                    Quản lý khu vườn
                </h6>
            </div>
            <div className="my-5 mx-5">
                <h6 className="d-flex align-items-center" onClick={handleMangeDevice}>
                    <img src={deviceLogo} className="pe-3 admin-cloud-icon"></img>
                    Thông báo
                </h6>
            </div>
            <hr className="w-75 mx-auto" />
            <div className="logout text-center mt-5" style={logoutStyle} onClick={()=>navigate('/login-as')}>Đăng xuất</div>
        </div>
    );
}

export default SideBar;