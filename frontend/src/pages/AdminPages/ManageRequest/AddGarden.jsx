import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

function AddGarden() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleAddRequest() {

    }
    return (
        <>
            <Button variant="dark" onClick={handleShow} className="btn-lg mx-2">
                Thêm mảnh vườn
            </Button>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="bg-dark" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        Thêm mảnh vườn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex my-3 align-items-center">
                        Chủ sở hữu:
                        <input
                            type="text"
                            className="form-control w-50 mx-3"
                            placeholder="Nhập tên tài khoản hoặc số điện thoại"
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        Tên mảnh vườn:
                        <input
                            type="text"
                            className="form-control w-25 mx-3"
                            placeholder="VUON01"
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                         Diện tích:
                        <input
                            type="text"
                            className="form-control w-25 mx-3"
                            placeholder="nguyenvana123"
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        Vị trí:
                        <input
                            type="text"
                            className="form-control w-75 mx-3"
                            placeholder=" 268, Lý Thường Kiệt. P. 14, Q. 10"
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        Loại cây trồng:
                        <input
                            type="text"
                            className="form-control w-25 mx-3"
                            placeholder="Nho, Cam, Bưởi,..."
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        <div className="col-4">Cảm biến độ ẩm đất:</div>
                        <div className="col-1">
                            <input
                                type="text"
                                className="form-control w-75"
                            />
                        </div>
                        <div className="col-4">Cảm biến ánh sáng:</div>
                        <div className="col-1">
                            <input
                                type="text"
                                className="form-control w-75"
                            />
                        </div>
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        <div className="col-4">Cảm biến độ ẩm không khí:</div>
                        <div className="col-1">
                            <input
                                type="text"
                                className="form-control w-75"
                            />
                        </div>
                        <div className="col-4">Cảm biến nhiệt độ:</div>
                        <div className="col-1">
                            <input
                                type="text"
                                className="form-control w-75"
                            />
                        </div>
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        <div className="col-4">Máy bơm:</div>
                        <div className="col-1">
                            <input
                                type="text"
                                className="form-control w-75"
                            />
                        </div>
                        <div className="col-4">Đèn cảnh báo:</div>
                        <div className="col-1">
                            <input
                                type="text"
                                className="form-control w-75"
                            />
                        </div>
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

export default AddGarden;