import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import del from "../../../assets/delete.png";
import white_request from "../../../assets/request-white.png";
import { hideRequest } from '../../../api/requestApi';
function DeleteUserModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const status = props.request.status
    const text = (status) ?
        "Bạn đã xử lý yêu cầu này, bạn có muốn ẩn yêu cầu này không ?" :
        "Chưa xử lý yêu cầu này, vui lòng xử lý trước khi ẩn."
    
    function handleDeleteRequest() {
        if (!status) {
            alert('Phải xử lý yêu cầu trước khi ẩn !')
        } else {
            const id = props.request._id
            const data = {
                id: id,
                type: "hide"
            }
            hideRequest(data)
            alert('Ẩn thành công')
            location.reload()
        }
    }
    return (
        <>
            <Button variant="danger" onClick={handleShow} className="mx-2">
                <img src={del} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="bg-danger" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        <img src={white_request} className="me-2" />
                        Ẩn yêu cầu của khách hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {text}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteRequest} size="lg">
                        Xác nhận
                    </Button>
                    <Button variant="secondary" onClick={handleClose} size="lg">
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteUserModal;