import React, { useEffect, useState } from 'react';
import { Button, Form, Modal} from 'react-bootstrap';
import write from '../../../assets/write.png'
import { updateSchedule } from '../../../api/schedule';
const EditSchedule = (props) => {
    const [show,setShow] = useState(false);
    const [schedule, setSchedule] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {   
        setSchedule(props.schedule)
    },[props.schedule])
    const handleChangeTime = (e) => {
        console.log(schedule)
        const time = e.target.value
        schedule.time = time
        setSchedule(schedule)
        console.log(schedule)
    }
    const handleChangeWater = (e) => {
        const water = e.target.value
        schedule.water = water
        setSchedule(schedule)
        // console.log(schedule)

    }
    const handleClick = () => {
        updateSchedule(props.schedule._id,schedule)
        props.onEdit(props.schedule._id,schedule)
        setShow(false)
    }
    return (
        <>
            <Button onClick={handleShow}>
                <img src={write} alt="Chỉnh sửa"/>
            </Button>
            <Modal show = {show} onHide={handleClose} centered>
                <Modal.Header className="bg-primary" closeButton>
                    <Modal.Title>Lịch tưới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group onChange={handleChangeTime}>
                            <Form.Label>Time</Form.Label>
                            <Form.Control size="lg" type="time" value={props.time}/>
                        </Form.Group>
                         <Form.Group onChange={handleChangeWater}>
                            <Form.Label>Lượng nước</Form.Label>
                            <Form.Control size="lg" type="number" value={props.water}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClick}>Lưu </Button>
                    <Button variant="secondary" onClick={()=>setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditSchedule;