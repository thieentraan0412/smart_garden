import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import white_user from "../../../assets/user-white.png"
import write from "../../../assets/write.png";
import { updateUserInfor } from "../../../api/userApi"
function UpdateUserModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const field = useRef(null)
    function handleUpdateUser() {
        const form = field.current
        const id = props.user.id
        const data = {
            type: "update",
            email: form['email'].value,
            phone: form['phone'].value,
            password: form['password'].value,
            address: form['address'].value
        }

        if (!data.password) {
            alert("Không được để trống mật khẩu")
        } else if (!data.phone) {
            alert("Không được để trống số điện thoại")
        } else if (!data.email) {
            alert("Không được để trống email")
        } else if (!data.address) {
            alert("Không được để trống địa chỉ")
        } else {
            const isSuccess = updateUserInfor(id, data) 
            if (isSuccess) {
                alert("Cập nhật thành công")
                location.reload()
            }
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="mx-2">
                <img src={write} />
            </Button>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="bg-primary" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        <img src={white_user} className="user-modal--user-icon me-2" />
                        Cập nhật thông tin nè
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form ref={field}>
                        <div className="d-flex my-3 align-items-center">
                            Tên tài khoản: {props.user.account}
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Mật khẩu:
                            <input
                                type="text"
                                className="form-control w-50 mx-3"
                                min={8}
                                max={20}
                                defaultValue={props.user.password}
                                name="password"

                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Số điện thoại:
                            <input
                                type="tel"
                                className="form-control w-50 mx-3"
                                placeholder="0123456789"
                                defaultValue={props.user.phone}
                                name="phone"
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Email:
                            <input
                                type="text"
                                className="form-control w-50 mx-3"
                                placeholder="abcder123"
                                defaultValue={props.user.email}
                                name="email"
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Địa chỉ:
                            <input
                                type="text"
                                className="form-control w-75 mx-3"
                                placeholder="Your home address"
                                defaultValue={props.user.address}
                                name="address"
                            />
                        </div>
                        {/* <div className="col-6">
                            id: {props.user.id}
                        </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdateUser} size="lg">
                        Cập nhật
                    </Button>
                    <Button variant="secondary" onClick={handleClose} size="lg">
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUserModal;