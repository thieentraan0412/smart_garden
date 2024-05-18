import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import disable from "../../../assets/disable.png";
import user from '../../../assets/user.png';
import { handleDeviceRequest } from '../../../api/deviceApi';
import context from 'react-bootstrap/esm/AccordionContext';
function DisableDeviceModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const status = props.device.status
    const text = (status) ? 
        "Bạn có muốn sửa trạng thái của thiết bị này thành đang hỏng không ?" :
        "Thiết bị này sẽ được ghi nhận là hoạt động, bạn có muốn tiếp tục không ?"
    function handleDisableRequest() {
        const id = props.device.id
        const data = {
            id: id,
            status: !status
        }
        const isSuccess = handleDeviceRequest(data)
        if (isSuccess) {
            alert('Cập nhật thành công')
            location.reload()
        }
    }
    return (
        <>
            <Button variant="warning" onClick={handleShow} className="mx-2">
                <img src={disable} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="bg-warning" closeButton>
                    <Modal.Title className="d-flex align-items-center">
                        <img src={user} className="user-modal--user-icon me-2" />
                        Vô hiệu hóa thiết bị
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleDisableRequest} size="lg">
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

export default DisableDeviceModal;