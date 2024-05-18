import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import read from "../../../assets/read.png";
import white_user from "../../../assets/user-white.png"
function ViewUserModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        // props.par.current.setAttribute("class", "text-muted");
    }
    
    return (
        <>
            <Button variant="success" onClick={handleShow} className="mx-2">
                <img src={read}/>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="bg-success" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        <img src={white_user} className="user-modal--user-icon me-2" />
                        Thông tin khách hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row my-2">
                        <div className="my-3">
                            id: {props.user.id}
                        </div>
                        <div className="col-6">
                            Họ và tên: {props.user.name}
                        </div>
                        <div className="col-6">
                            Số điện thoại: {props.user.phone}
                        </div>
                    </div>
                    <div className="my-3">
                        Địa chỉ: {props.user.address}
                    </div>
                    <div className="my-3">
                        Tên tài khoản: {props.user.account}
                    </div>
                    <div className="my-3">
                        Mật khẩu: {props.user.password}
                    </div>
                    <div className="my-3">
                        Mật khẩu: {props.user.email}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewUserModal;