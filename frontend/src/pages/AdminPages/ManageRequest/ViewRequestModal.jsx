import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import read from "../../../assets/read.png";
import white_request from "../../../assets/request-white.png";
import DeleteRequest from "./DeleteRequest"
import UpdateRequest from './UpdateRequest';
import CreateRequest from './CreateRequest';
import { delPieceById, handleRequest } from '../../../api/garden_pieceApi'
import { hideRequest } from '../../../api/requestApi';
function ViewRequestModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }


    const typ = props.request.name
    let data = {}
    let content
    if (typ == "Delete Garden") {
        content = <DeleteRequest request={props.request} />
    } else if (typ == "Register Garden") {
        content = <CreateRequest request={props.request} />
        data = {
            request: "add",
            name: props.request.registerGarden.name,
            type: props.request.registerGarden.type,
            location: props.request.registerGarden.location,
            owner: props.request.registerGarden.owner,
            area: props.request.registerGarden.area,
        }
        console.log('data ne');
        console.log(data);
    } else {
        content = <UpdateRequest request={props.request} />
        data = {

            type: "update",
            id: props.request.registerGarden.id,
            name: props.request.registerGarden.name,
            type: props.request.registerGarden.type,
            location: props.request.registerGarden.location,
            owner: props.request.registerGarden.owner,
            area: props.request.registerGarden.area,
        }
        console.log('data ne');
        console.log(data);
    }
    function handleAcceptRequest() {
        if (props.request.status) {
            alert('Bạn đã xử lý yêu cầu này rồi')
        } else {
            const flag = {
                id: props.request._id,
                type: "read"
            }
            hideRequest(flag)
            console.log('flag ne');
            console.log(flag);
            if (typ == "Delete Garden") {
                const isSuccess = delPieceById(props.request.registerGarden.id)
                if (isSuccess) {
                    alert('Xóa thành công')
                    location.reload();
                }
            } else if (typ == "Register Garden") {
                const isSuccess = handleRequest(data)
                if (isSuccess) {
                    alert('Thêm thành công')
                    location.reload();
                }
            } else {
                const isSuccess = handleRequest(data)
                if (isSuccess) {
                    alert('Sửa thành thành công')
                    location.reload();
                }
            }
        }

    }
    return (
        <>
            <Button variant="success" onClick={handleShow} className="mx-2">
                <img src={read} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
            >
                <Modal.Header className="bg-success" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        <img src={white_request} className="me-2" />
                        {props.request.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="my-3">
                        {/* Tên mảnh vườn: {props.request.name} */}
                    </div>
                    <div className="my-3">
                        {/* Diện tích: {props.request.detail.area} */}
                    </div>
                    <div className="my-3">
                        {/* Vị trí: {props.request.detail.location} */}
                    </div>
                    <div className="my-3">
                        {/* Loại cây trồng: {props.request.detail.type} */}
                    </div>
                    <div className="row">
                        {content}
                        <hr className="w-75 mx-auto my-4" />
                        <div className="fw-bold">
                            Ghi chú của khách hàng: {props.request.registerGarden.special}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAcceptRequest} size="lg">
                        Đồng ý
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewRequestModal;