import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import white_user from "../assets/user-white.png"
import write from "../../../assets/write.png";
import { useParams } from 'react-router-dom';
import { handleDeviceRequest } from "../../../api/deviceApi"
function UpdateDeviceModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const params = useParams()
    const type = params.device_type
    const sensor = ['soil', 'air', 'temp', 'light']
    // form data
    const [piece, setPiece] = useState(props.device.garPiece)
    const [x, setX] = useState(props.device.coordinates.x);
    const [y, setY] = useState(props.device.coordinates.y);
    const [min, setMin] = useState(sensor.includes(type) ? props.device.threshold.min: null);
    const [max, setMax] = useState(sensor.includes(type) ? props.device.threshold.min: null)
    const [water, setWater] = useState((type == "pump") ? props.device.water : null);
    const [time, setTime] = useState((type == "led") ? props.device.time : null);

    
    let content
    if (sensor.includes(type)) {

        content = <>
            <div className="d-flex my-3 align-items-center">
                Ngưỡng dưới:
                <input
                    type="text"
                    className="form-control w-25 mx-3"
                    defaultValue={props.device.threshold.min}
                    onChange={e => setMin(e.target.value)}
                />
            </div>
            <div className="d-flex my-3 align-items-center">
                Ngưỡng trên:
                <input
                    type="text"
                    className="form-control w-25 mx-3"
                    defaultValue={props.device.threshold.max}
                    onChange={e => setMax(e.target.value)}
                />
            </div>
        </>
    } else if (type == "pump") {

        content = <>
            <div className="d-flex my-3 align-items-center">
                Lượng nước:
                <input
                    type="text"
                    className="form-control w-25 mx-3"
                    defaultValue={props.device.water}
                    onChange={e => setWater(e.target.value)}
                />
            </div>
        </>
    } else {

        content = <>
            <div className="d-flex my-3 align-items-center">
                Thời gian chiếu sáng:
                <input
                    type="text"
                    className="form-control w-25 mx-3"
                    defaultValue={props.device.time}
                    onChange={e => setTime(e.target.value)}
                />
            </div>
        </>
    }
    function handleUpdateUser() {
        // alert('handle update user ne');
        // alert('piece ne ' + piece)
        if (!piece) {
            alert('Khu vườn sở hữu không được để trống')
        } else if (!x || !y) {
            alert('Vị trí của thiêt bị không được để trống')
        } else {
            if (sensor.includes(type) && (!min || !max)) {
                alert('Ngưỡng giá trị của cảm biến không được để trống')
            } else if (type == "pump" && !water) {
                alert('Lượng nước không được để trống')
            } else if (type == "led" && !time) {
                alert('Vui lòng nhập thời gian chiếu sáng')
            } else {
                if (min > max) {
                    alert("Ngưỡng dưới phải nhỏ hơn ngưỡng trên")
                } else {
                    const data = {
                        request: "update",
                        id: props.device.id,
                        garPiece: parseInt(piece),
                        coordinates: {
                            x: parseInt(x),
                            y: parseInt(y)
                        },
                        threshold: {
                            min: parseInt(min),
                            max: parseInt(max)
                        },
                        water: water,
                        time: time
                    }
                    const isSuccess = handleDeviceRequest(data)
                    if (isSuccess) {
                        alert("Cập nhật thông tin thiết bị thành công")
                        location.reload();
                    }
                }
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
                        Cập nhật thông tin thiết bị
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="my-3">
                        ID: {props.device.id}
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        Tên thiết bị: {props.device.name}
                        {/* <input
                            type="text"
                            className="form-control w-50 mx-3"
                            placeholder="abcder123"
                            defaultValue={props.device.name}
                        /> */}
                    </div>
                    {/* <div className="d-flex my-3 align-items-center">
                        ID:
                        <input
                            type="password"
                            className="form-control w-50 mx-3"
                            min={8}
                            max={20}
                            defaultValue={props.device.id}
                        />
                    </div> */}
                    <div className="d-flex my-3 align-items-center">
                        Khu vườn sở hữu:
                        <input
                            type="text"
                            className="form-control w-25 mx-3"
                            defaultValue={props.device.garPiece}
                            onChange={e => setPiece(e.target.value)}
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        Tọa độ x:
                        <input
                            type="text"
                            className="form-control w-25 mx-3"
                            defaultValue={props.device.coordinates.x}
                            onChange={e => setX(e.target.value)}
                        />
                    </div>
                    <div className="d-flex my-3 align-items-center">
                        Tọa độ y:
                        <input
                            type="text"
                            className="form-control w-25 mx-3"
                            defaultValue={props.device.coordinates.y}
                            onChange={e => setY(e.target.value)}
                        />
                    </div>
                    {content}
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

export default UpdateDeviceModal;