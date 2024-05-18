import { MDBCheckbox } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import classNames from 'classnames/bind';
import styles from './Schedule.module.scss'

const cx= classNames.bind(styles);

const Custom = (props) => {
    const [show,setShow] = useState(false);
    const [minDate,setMindate] = useState('');
    const [maxDate,setMaxdate] = useState('');
    const [n,setN] = useState();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [values, setValues] = useState()
    
    // chọn ngày ngẫu nhiên
    const [CusDate, setCusDate] = useState("");
    const handleChange = CusDate => {
        const dates = CusDate.map(date => new Date(date));
        setCusDate(dates)
    };

    // chọn khoảng thời gian
    const [date, setDate] = useState("");
    const changeMinDate = date => {
        // const value = date.toString();
        date = new Date(date);
        setMindate(date);
    };
    const changeMaxDate = date => {
        // const value = date.toString();
        date = new Date(date);
        setMaxdate(date);
    };

    const handleSubmit = () => {
        props.onChange(CusDate);
        setShow(false);
    }
    const handleChangeDaily = (e) => {
        const n = Number(e.target.value);
        setN(n);
        const dates = [];
        var date = new Date(minDate);
        const max = new Date(maxDate);
        while(date<max){
            dates.push(date);
            const dateCopy = new Date(date);            
            dateCopy.setDate(dateCopy.getDate() + n);
            date = dateCopy;
        }
        console.log(dates);
        setCusDate(dates);
    }
    const handleCancel = () => {
        setCusDate({});
        setMindate('')
        setMaxdate('')
    }
    return (
        <>
            <div className="d-grid gap-2">
                <Button variant="light" size="lg" onClick={handleShow}>Tùy chỉnh</Button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton><p>Tùy chỉnh</p></Modal.Header>
                <Modal.Body>
                    <Row className='py-2'>    
                        <Col md={{ span: 4}}>
                            <p>Ngày bắt đầu:</p>
                            <DatePicker
                                minDate={new Date()}
                                value={minDate}
                                onChange={changeMinDate}
                                maxDate={maxDate}
                            />
                        </Col>  
                        <Col md={{ span: 4, offset:2}}>
                            <p>Ngày kết thúc:</p>
                            <DatePicker
                                value={maxDate}
                                onChange={changeMaxDate}
                                minDate={minDate}
                            />
                        </Col>  
                    </Row>
                        
                    <Row className='py-2'>
                        <Form.Group >
                            <p>Cách ngày:</p>
                            <Form.Control type="number" onChange={handleChangeDaily} min={0} value={n}/>
                        </Form.Group>
                    </Row>
                    <Row className='py-2'>
                        <p>Tùy chọn ngày:</p>
                        <DatePicker 
                        value={CusDate} 
                        onChange={handleChange}
                        multiple
                        minDate={minDate?minDate:new Date()}
                        maxDate={maxDate}
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

export default Custom;