import classnames from 'classnames/bind'
import styles from './GardenRegis.module.scss'
import { Button, Container, Row, Col, Form, Modal } from 'react-bootstrap'
import { Link,useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import SideBar from '../../../components/GlobalStyles/SideBar';

import { getUserbyAccount } from '../../../api/userApi';
import { registerGardenRequest } from '../../../api/requestApi';


const cx = classnames.bind(styles);

//component style
const ButtonStyled = {
    width: "100%"
}

const labelStyle = {
    // fontSize: "medium"
}

function GardenRegis(){
    const params = useParams()
    const navigate = useNavigate()

    const [soil, setSoil] = useState(1)
    const [light, setLight] = useState(1)
    const [air, setAir] = useState(1)
    const [temp, setTemp] = useState(1)
    const [pump, setPump] = useState(1)
    
    const [name, setName] = useState('')
    const [area, setArea] = useState()
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')
    const [special, setSpecial] = useState('')

    //alert
    const [fill, setFill] = useState(false);
    const handleCloseFill = () => {
        setFill(false)
    };

    const [sendReq, setSendReq] = useState(false)
    const [accept, setAccept] = useState(false);
    const handleCloseAccept = () => {
        setAccept(false)
    };
    const handleAccept = ()=>{
        setAccept(false)
        setSendReq(true)
    }

    const [success, setSuccess] = useState(false);
    const handleCloseSuccess = () => {
        navigate(`/${params.account}`)
    };

    const [fail, setFail] = useState(false);
    const handleCloseFail = () => {
        setFail(false)
    };

    const [user,setUser] = useState()
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(name == '' || area == null || location == '' || type == '')
        {
            setFill(true)
            return;
        }

        setAccept(true)
        setDataSend({
            sender: user.account,
            device: [
                {
                    name: 'Do am',
                    quantity: air
                },

                {
                    name: 'maybom',
                    quantity: pump
                },

                {
                    name: 'Nhiet do',
                    quantity: temp
                },

                {
                    name: 'Do am dat',
                    quantity: soil
                },

                {
                    name: 'Anh sang',
                    quantity: light
                }
            ],
            registerGarden:
            {
                name: name,
                type: type, // Loai cay trong
                location: location,
                owner: user.account,
                area: area,
                special: special
            }
        }) 
    }

    const setSensor = (sen,val)=>{
        if(val<1) val=1;
        val = parseInt(val)
        if(sen == "air") setAir(val)
        if(sen == "soil") setSoil(val)
        if(sen == "light") setLight(val)
        if(sen == "temp") setTemp(val)
        if(sen == "pump") setPump(val)      
    }
    
    const loadData = async()=>{
        return await getUserbyAccount(params.account).then(res=>setUser(res))
    }

    useEffect(()=>{
        loadData()
    },[])

    const [dataSend, setDataSend] = useState({})

    useEffect(()=>{
        if(sendReq){
            const x = registerGardenRequest(dataSend);
            if(x){
                setSuccess(true)
                setSendReq(false)
            }
            else{
                setFail(true)
                setSendReq(false)
            }
        }
    },[sendReq])

    return(
        <Container className='justify-content-center'>
            <Modal
            show={fill}
            onHide={handleCloseFill}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Điền thiếu thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>Vui lòng điền đầy đủ thông tin</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFill}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal
            show={accept}
            onHide={handleCloseAccept}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ấn xác nhận để gửi yêu cầu</Modal.Title>
                </Modal.Header>
                <Modal.Body>Hãy chắc chắn bạn muốn gửi yêu cầu tạo mảnh vườn này</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAccept}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAccept}>Xác nhận</Button>
                </Modal.Footer>
            </Modal>

            <Modal
            show={success}
            onHide={handleCloseSuccess}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Gửi yêu cầu thành công</Modal.Title>
                </Modal.Header>
                <Modal.Body>Hãy chờ admin duyệt yêu cầu của bạn</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSuccess}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal
            show={fail}
            onHide={handleCloseFail}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Gửi yêu cầu thất bại</Modal.Title>
                </Modal.Header>
                <Modal.Body>Vui lòng gửi lại yêu cầu</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFail}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <SideBar position="garden" account={params.account}/>
                <Col xs='9'>
                    <Form className='mt-5 mb-2' onSubmit={e=>handleSubmit(e)}>
                        <Form.Group as={Row} className="mb-3" controlId="gname">
                            <Form.Label column xs='2' style={labelStyle}>Tên mảnh vườn:</Form.Label>
                            <Col xs='10'>
                                <Form.Control  type="text"  onChange={e=> setName(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="area">
                            <Form.Label column xs='2' style={labelStyle}>Diện tích (hecta):</Form.Label>
                            <Col xs='10'>
                                <Form.Control  type="text"  onChange={e=> setArea(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="location">
                            <Form.Label column xs='2' style={labelStyle}>Vị trí:</Form.Label>
                            <Col xs='10'>
                                <Form.Control  type="text"  onChange={e=> setLocation(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="type">
                            <Form.Label column xs='2' style={labelStyle}>Loại cây trồng:</Form.Label>
                            <Col xs='10'>
                                <Form.Control  type="text"  onChange={e=> setType(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group className="mb-5" controlId="spec-req">
                            <Form.Label style={labelStyle}>Yêu cầu đặc biệt (không bắt buộc)</Form.Label>
                            <Form.Control  as="textarea" rows={3} onChange={e=> setSpecial(e.target.value)} />
                        </Form.Group>

                        <Row>
                            <Col xs='5' className='my-2'>
                                <div className={cx('sensor')}>
                                    <p className={cx('num-sensor')}>Số cảm biến độ ẩm đất: </p>
                                    <Button variant="light" onClick={() => setSensor("soil",soil+1)}>
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </Button>
                                    
                                    <Form.Group controlId="type">
                                        <Form.Control type="text" className={cx('number')} value={soil} onChange={e=>setSensor("soil",e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Button variant="light" onClick={()=> setSensor("soil",soil-1)}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Button>
                                </div>
                            </Col>

                            <Col xs={{span: 5, offset: 2}} className='my-2'>
                                <div className={cx('sensor')}>
                                    <p className={cx('num-sensor')}>Số cảm biến ánh sáng: </p>
                                    <Button variant="light" onClick={()=> setSensor("light",light+1)}>
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </Button>
                                    
                                    <Form.Group controlId="type">
                                        <Form.Control type="text" className={cx('number')} value={light} onChange={e=>setSensor("light",e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Button variant="light" onClick={()=> setSensor("light",light-1)}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Button>
                                </div>
                            </Col>

                            <Col xs='5' className='my-2'>
                                <div className={cx('sensor')}>
                                    <p className={cx('num-sensor')}>Số cảm biến độ ẩm không khí: </p>
                                    <Button variant="light" onClick={()=>setSensor("air",air+1)}>
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </Button>
                                    
                                    <Form.Group controlId="type">
                                        <Form.Control type="text" className={cx('number')} value={air} onChange={e=>setSensor("air",e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Button variant="light" onClick={()=>setSensor("air",air-1)}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Button>
                                </div>
                            </Col>

                            <Col xs={{span: 5, offset: 2}} className='my-2'>
                                <div className={cx('sensor')}>
                                    <p className={cx('num-sensor')}>Số cảm biến nhiệt độ: </p>
                                    <Button variant="light" onClick={()=>setSensor("temp",temp+1)}>
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </Button>
                                    
                                    <Form.Group controlId="type">
                                        <Form.Control type="text" className={cx('number')} value={temp} onChange={e=>setSensor("temp",e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Button variant="light" onClick={()=>setSensor("temp",temp-1)}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Button>
                                </div>
                            </Col>

                            <Col xs={{span: 5, offset: 3}} className='my-2'>
                                <div className={cx('sensor')}>
                                    <p className={cx('num-sensor')}>Số máy bơm: </p>
                                    <Button variant="light" onClick={()=>setSensor("pump",pump+1)}>
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </Button>
                                    
                                    <Form.Group controlId="type">
                                        <Form.Control type="text" className={cx('number')} value={pump} onChange={e=>setSensor("pump",e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Button variant="light" onClick={()=>setSensor("pump",pump-1)}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <Row className='mt-5'>
                            <Col xs={{span: 2, offset: 3}}>
                                <Button variant="danger" style={ButtonStyled} href={`/${params.account}`}>
                                    Hủy
                                </Button>
                            </Col>
                            <Col xs={{span: 2, offset: 2}}>
                                <Button type='submit' variant="success" style={ButtonStyled}>
                                    Gửi
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    
                </Col>
            </Row>
        </Container>
    )
}

export default GardenRegis;