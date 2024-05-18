import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import read from "../assets/read.png";
import white_user from "../../../assets/user-white.png"
import { useParams } from 'react-router-dom';
function ViewDeviceModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        // props.par.current.setAttribute("class", "text-muted");
    }
    const params = useParams()
    // alert('params ne ' + params.account);
    const typ = params.device_type
    let content
    const sensor = ['soil', 'air', 'temp', 'light']
    if (sensor.includes(typ)) {
        content = <>
            <div className="my-3">
                Ngưỡng dưới: {props.device.threshold.min}
            </div>
            <div className="my-3">
                Ngưỡng trên: {props.device.threshold.max}
            </div>
        </>
    } else if (typ == "led") {
        content = <>
            <div className="my-3">
                Thời gian chiếu sáng: {props.device.time}
            </div>
        </>
    } else {
        content = <>
            <div className="my-3">
                Lượng nước: {props.device.water}
            </div>
        </>
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
            >
                <Modal.Header className="bg-success" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        <img src={white_user} className="user-modal--user-icon me-2" />
                        Thông tin Thiết bị
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="my-3">
                        ID: {props.device.id}
                    </div>
                    <div className="my-3">
                        Chủ vườn: {props.device.owner}
                    </div>
                    <div className="my-3">
                        Tên thiết bị: {props.device.name}
                    </div>
                    <div className="my-3">
                        Tọa độ x: {props.device.coordinates.x}
                    </div>
                    <div className="my-3">
                        Tọa độ y: {props.device.coordinates.y}
                    </div>
                    {content}
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
export default ViewDeviceModal;