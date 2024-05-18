import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Button, Form, FormGroup, Modal, Row } from 'react-bootstrap';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

const Monthly = (props) => {

    const [show,setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [date, setDate] = useState();

    const handleChange = date => {
        setDate(date)
    };
    const handleSubmit = () => {
        // console.log(typeof date[0])
        const listDate = date.map((item) =>(new Date(item)));
        props.onChange(listDate);
        setShow(false);
    }

    const handleCancel = () => {
        setDate({});
    }
    return (
        <>
        <div className="d-grid gap-2">
                <Button variant="light" size="lg" onClick={handleShow}>Hàng tháng</Button>
        </div>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton><p>Lịch tưới theo tháng</p></Modal.Header>
            <Modal.Body>
                <Row> 
                    <p>Chọn ngày lặp lại theo tháng:</p>                
                    <DatePicker 
                        minDate={new Date()}
                        value={date} 
                        onChange={handleChange}
                        multiple
                        />
                </Row> 
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleCancel}>Đặt lại</Button>   
                <Button onClick={handleSubmit}>Lưu</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
};

export default Monthly;