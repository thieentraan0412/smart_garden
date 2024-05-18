import axios from 'axios';
import { MDBBtnGroup, MDBCheckbox } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';

const Weekly = (props) => {
    const [day,setDay] = useState([]);
    const [show,setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        if(day.includes(value)){
            setDay(day.filter(function(item) {
                return item !== value
            }))
        }
        else{
            day.push(value)
            setDay(day)
        }
        // setDay(day => ({
        //     ...day,
        //     [e.target.value]:!day[newValue]
        // }))
    }
    const handleSubmit = () => {
        console.log(day)
        setDay([]);
        props.onChange(day);
        setShow(false);
    }
    const handleCancel = () => {
        setDay([]);
    }
    return (
        <>
            <div className="d-grid gap-2">
                <Button variant="light" size="lg" onClick={handleShow}>Hàng tuần</Button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton><p>Lịch tưới theo tuần</p></Modal.Header>
                <Modal.Body>   
                    <MDBCheckbox name='flexCheck' value='Mon' id='flexCheckDefault'  onChange={handleChange} label='Thứ hai' />
                    <MDBCheckbox name='flexCheck' value='Tue' id='flexCheckChecked1' onChange={handleChange} label='Thứ ba' />
                    <MDBCheckbox name='flexCheck' value='Wed' id='flexCheckChecked2' onChange={handleChange} label='Thứ tư' />
                    <MDBCheckbox name='flexCheck' value='Thu' id='flexCheckChecked3' onChange={handleChange} label='Thứ năm' />
                    <MDBCheckbox name='flexCheck' value='Fri' id='flexCheckChecked4' onChange={handleChange} label='Thứ sáu' />
                    <MDBCheckbox name='flexCheck' value='Sat' id='flexCheckChecked5' onChange={handleChange} label='Thứ bảy' />
                    <MDBCheckbox name='flexCheck' value='Sun' id='flexCheckChecked6' onChange={handleChange} label='Chủ nhật' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCancel}>Đặt lại</Button>   
                    <Button onClick={handleSubmit}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Weekly;