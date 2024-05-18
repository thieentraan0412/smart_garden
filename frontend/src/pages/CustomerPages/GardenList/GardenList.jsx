import classnames from 'classnames/bind'
import styles from './GardenList.module.scss'
import { Button, Container, Row, Col, Modal } from 'react-bootstrap'
import { useNavigate, useParams,Link } from 'react-router-dom';
import SideBar from '../../../components/GlobalStyles/SideBar';
import { useEffect, useState } from 'react';

import { getPrivatePiece, delPieceById } from '../../../api/garden_pieceApi';
import { getPrivateRecord } from '../../../api/recordApi';
import { deleteGardenRequest } from '../../../api/requestApi';


const cx = classnames.bind(styles);

//component style
const ButtonStyled = {
    width: "100%",
    height: "30px",
    fontSize: "15px"
}

function GardenList() {
    const [gardens, setGardens] = useState([])
    const params = useParams()

    //alert
    const [delGar, setDelGar] = useState(false);
    const handleCloseDelete = () => {
        setDelGar(false)
        loadData()
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
    const handleDelete = async (gar)=>{
        var sensor =[];
        await getPrivateRecord(gar.id).then(res => sensor=res);
        if(sensor.length == 0 ){
            delPieceById(gar.id)
            setDelGar(true)
            // loadData();
        }
        else
        {
            setAccept(true)
            setDataSend({
                sender: params.account,
                registerGarden:
                {
                    id: gar.id,
                    name: gar.name,
                    owner: gar.owner
                }
            })
        }
    }

    const [success, setSuccess] = useState(false);
    const handleCloseSuccess = () => {
        setSuccess(false)
    };

    const [fail, setFail] = useState(false);
    const handleCloseFail = () => {
        setFail(false)
    };

    //data and side effect
    const loadData = async () => {
        return await getPrivatePiece(params.account).then((res) => setGardens(res))
    }

    useEffect(() => {
        loadData()
    }, [])

    const [dataSend, setDataSend] = useState({})

    useEffect(()=>{
        if(sendReq){
            const x = deleteGardenRequest(dataSend);
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

    const Garden = ({ gar }) => {
        // const dtail = gar       
        return (
            <Col xs='6' className='my-3' >
                <div className={cx('garden')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 15 15"><path fill="green" fillRule="evenodd" d="M7 4.5A4.5 4.5 0 0 1 11.5 0H15v3.5A4.5 4.5 0 0 1 10.5 8H8v7H7v-4H4.5A4.5 4.5 0 0 1 0 6.5V3h3.5c1.414 0 2.675.652 3.5 1.671V4.5Zm1.146 1.646l3-3l.708.708l-3 3l-.708-.708Zm-2 3.708l-3-3l.708-.708l3 3l-.708.708Z" clipRule="evenodd"/></svg>
                    <p onClick={()=>detail(gar)}>{gar.name}</p>
                    <Link to={`/${params.account}/garden-mod/${gar.id}`}><svg className={cx('edit')} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="blue" d="M6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v3.1l-8 7.975V22H6Zm8 0v-2.125l5.15-5.175l2.15 2.1l-5.175 5.2H14Zm8.025-5.9L19.9 13.975l.7-.7q.3-.3.725-.3t.7.3l.7.725q.275.3.275.713t-.275.687l-.7.7ZM13 9h5l-5-5v5Z"/></svg></Link>
                    <svg onClick={()=>handleDelete(gar)} className={cx('delete')} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="red" d="m18 9l-5-5v3q0 .825.588 1.413T15 9h3Zm0 10.425L16.6 20.8q-.275.275-.688.288T15.2 20.8q-.275-.275-.275-.7t.275-.7l1.4-1.4l-1.4-1.4q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.4 1.4l1.4-1.4q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L19.425 18l1.375 1.4q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275L18 19.425ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762v3.525q-.475-.175-.988-.263T17.976 12q-2.5 0-4.237 1.738T12 17.974q0 1.125.4 2.163T13.55 22H6Z"/></svg>
                </div>
            </Col>
        )
    }

    const navigate = useNavigate()
    const newRegis = ()=>{
        navigate(`/${params.account}/garden-regis`)
    }

    const detail = (gar) => {
        navigate(`/${params.account}/garden-detail/${gar.id}`)
    }

    

    return (
        <Container>
            <Modal
            show={delGar}
            onHide={handleCloseDelete}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xóa mảnh vườn thành công</Modal.Title>
                </Modal.Header>
                <Modal.Body>Mảnh vườn đã được xóa</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
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
                <Modal.Body>Hãy chắc chắn bạn muốn gửi yêu cầu xóa mảnh vườn này</Modal.Body>
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
                <SideBar position="garden" account={params.account} />
                <Col xs='9'>
                    <h1 className={cx('title')}>Danh sách mảnh vườn</h1>
                    <Row>
                        <Col xs={{ span: 2, offset: 10 }}>
                            <Button variant="success" style={ButtonStyled} onClick={newRegis}>Đăng kí mới</Button>
                        </Col>
                    </Row>
                    <Row className='my-4'>
                        {gardens.map((garden, index) =>
                            <Garden key={index} gar={garden} />
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default GardenList;