import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
function DeleteGarden() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleAddRequest() {

    }
    return (
        <>
            <Button variant="dark" onClick={handleShow} className="btn-lg mx-2">
                Xóa mảnh vườn
            </Button>

            <Modal
                size=""
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="bg-dark" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        Xóa mảnh vườn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex my-3 align-items-center">
                        Chủ sở hữu:
                        <input
                            type="text"
                            className="form-control w-75 mx-3"
                            placeholder="Nhập tên tài khoản hoặc số điện thoại"
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        Tên mảnh vườn:
                        <input
                            type="text"
                            className="form-control w-50 mx-3"
                            placeholder="Nhập tên mảnh vườn cần xóa"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleAddRequest} size="lg">
                        Xác nhận
                    </Button>
                    <Button variant="secondary" onClick={handleClose} size="lg">
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteGarden;