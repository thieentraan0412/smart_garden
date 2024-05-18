import { useState } from "react";
import { Container, Modal, Row, Col, Button } from "react-bootstrap";
import { markReadNotification, deleteNotification } from "../../../api/notificationApi";


function Notification({id, type, urgent, isReadN, measure, threshold, time, gardenName, x, y, onDelete}) {
    const [visible, setVisiable] = useState(true)

    // Confirm modal
    const [showConfirm, setShowConfirm] = useState(false)
    const showModalConfirm = () => setShowConfirm(true)
    const hideModalConfirm = () => {
        setShowConfirm(false)
    }

    // Success Modal
    const [showSuccess, setShowSuccess] = useState(false)
    const showModalSuccess = () => {
        setShowSuccess(true)
        setShowConfirm(false)
        deleteNotification(id)
    }
    const hideModalSuccess = () => {
        setShowSuccess(false)
        setVisiable(false)
        onDelete()
    }

    // Detail Modal
    const [showDetail, setShowDetail] = useState(false)
    const [isRead, setIsRead] = useState(isReadN)
    const showModalDetail = () => {
        setShowDetail(true)
        if (!isRead) {
            setIsRead(true)
            markReadNotification(id)
        }
    }
    const hideModalDetail = () => setShowDetail(false)

    // Icon
    const icon_style = {height: '2rem',}
    let icon_src, icon_alt, measure_msg, threshold_msg;
    switch (type) {
        case "Temperature":
            icon_src = "/images/Icon_nhiet_do.svg"
            icon_alt = "nhiệt độ"
            measure_msg = `Nhiệt độ đo được ${measure}°C`
            threshold_msg = `Nhiệt độ ngưỡng ${threshold}°C`
            break
        case "Soil Humidity":
            icon_src = "/images/Icon_do_am_dat.svg"
            icon_alt = "độ ẩm đất"
            measure_msg = `Độ ẩm đo được ${measure}%`
            threshold_msg = `Độ ẩm ngưỡng ${threshold}%`
            break
        case "Harvest":
            icon_src = "/images/Icon_thu_hoach.svg"
            icon_alt = "thu hoạch"
            break
        case "Air Humidity":
            icon_src = "/images/Icon_do_am_khong_khi.svg"
            icon_alt = "độ ẩm không khí"
            measure_msg = `Độ ẩm đo được ${measure}%`
            threshold_msg = `Độ ẩm ngưỡng ${threshold}%`
            break
        default:
            icon_src = "/images/Icon_hu_hong_thiet_bi.svg"
            icon_alt = "hư hỏng thiết bị"
    }
    const font_style = `my-3 ${!isRead ? "fw-bold" : ""} ${urgent ? "text-danger" : ""}`

    // Time
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        hourCycle: 'h12',
    };
    const time_notify = new Date(time).toLocaleString('en-US', options)

    return (
        <>
        {   visible && ( <>
            <Row className={font_style}>
                <Col md={{span: 1}} onClick={showModalDetail} className="d-flex justify-content-center">
                    <img src={icon_src} alt={icon_alt} style={icon_style}/>
                </Col>
                <Col md={{span: 4}} onClick={showModalDetail}>Thông báo {icon_alt}</Col>
                <Col md={{span: 3}} onClick={showModalDetail}>{time_notify}</Col>
                <Col md={{span: 3}} onClick={showModalDetail}>{!isRead ? "Chưa đọc" : "Đã đọc"}</Col>
                <Col md={{span: 1}} className="d-flex justify-content-center">
                    <button onClick={showModalConfirm}>
                    <img src='/images/Icon_delete.svg' alt="Xóa" style={icon_style} />
                    </button>
                </Col>
            </Row>

            <Modal size='lg' id="Modal-detail" onHide={hideModalDetail} show={showDetail} centered>
                <Modal.Header>
                    <Container>
                    <Row>
                        <Col className='d-flex'>
                        <img src={icon_src} alt={icon_alt} style={icon_style}/>
                        <span className='ms-3 fs-5 fw-bold'>Thông báo {icon_alt}</span>
                        </Col>
                    </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                    <Row className='g-2'>
                        <Col sm={6} className="p-2">
                        Thời gian: {time_notify}
                        </Col>
                        {type !== "Harvest" && type !== "Device" && <Col sm={6} className="p-2">
                        {threshold_msg}
                        </Col>}
                        <Col sm={6} className="p-2">
                        Mảnh vườn: {gardenName}
                        </Col>
                        {type !== "Harvest" && type !== "Device" && <Col sm={6} className="p-2">
                        {measure_msg}
                        </Col>}
                        <Col sm={12} className="p-2">
                        Vị trí: Hàng {x} cột {y}
                        </Col>
                    </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={hideModalDetail} variant="secondary">Thoát</Button>
                </Modal.Footer>
            </Modal>

            <Modal id="Modal-confirm" onHide={hideModalConfirm} show={showConfirm} centered>
                <Modal.Body>
                    <p className='text-center fw-bold'>Bạn có muốn xóa thông báo này không?</p>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button onClick={showModalSuccess} variant="primary">Xác nhận</Button>
                    <Button onClick={hideModalConfirm} variant="danger" className='ms-5'>Hủy</Button>
                </Modal.Footer>
            </Modal>

            <Modal id="Modal-success" onHide={hideModalSuccess} show={showSuccess} centered>
                <Modal.Body className='d-flex flex-column justify-content-center'>
                    <img src="/images/Icon_xac_nhan.svg" style={{height: '5rem'}} alt="Xác nhận"/>
                    <div className='text-center fw-bold fs-6 mt-3'>Bạn đã xóa thành công</div>
                </Modal.Body>
            </Modal>

            </>)}
        </>
    )
}

export default Notification