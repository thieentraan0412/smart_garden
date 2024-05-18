import { Button, Container, Row, Col } from 'react-bootstrap';
import SideBar from '../SideBar';
import classnames from 'classnames/bind'

import data from "../deviceData.js";
import DeviceRow from "./DeviceRow";

import { useNavigate, useParams } from 'react-router-dom';
import AddSensor from "./AddSensor"
import { useState, useEffect } from 'react';
// import { getDeviceList } from '../../../api/deviceApi';
import { getPieceList } from '../../../api/garden_pieceApi'
import { generateDevice } from '../../../api/FactoryApi';
import { Pagination } from 'react-bootstrap'

function ManageDevice() {
    const lastPage = 5
    const sensorPerPage = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [startIndex, setStartIndex] = useState(1)

    const onPrev = () => {
        if (currentPage !== 1) {
            if (currentPage === startIndex) {
                setStartIndex(currentPage - 1)
            }
            setCurrentPage(currentPage - 1)
        }
    }

    const onNext = () => {
        if (currentPage !== lastPage) {
            if (currentPage === startIndex + 2) {
                setStartIndex(startIndex + 1)
            }
            setCurrentPage(currentPage + 1)
        }
    }

    const onFirst = () => {
        setCurrentPage(1)
        setStartIndex(1)
    }

    const onLast = () => {
        setCurrentPage(lastPage)
        setStartIndex(lastPage - 2)
    }


    const params = useParams()
    let device_type = params.device_type
    if (device_type == "light")
        device_type = "Cảm biến ánh sáng"
    else if (device_type == "temp")
        device_type = "Cảm biến nhiệt độ"
    else if (device_type == "soil")
        device_type = "Cảm biến độ ẩm đất"
    else if (device_type == "air")
        device_type = "Cảm biến độ ẩm không khí"
    else if (device_type == "led")
        device_type = "Đèn cảnh báo"
    else
        device_type = "Máy bơm"

    const username = params.account
    // alert('account ne ' + username)
    const pieceId = params.gar_id
    // alert('garpiece ne ' + pieceId)
    const typ = params.device_type
    // alert('device type ne ' + typ)
    const [device, setDevice] = useState([])
    const [garden, setGarden] = useState([])

    const loadGarden = async () => {
        try {
            const garList = await getPieceList(params.account)
            const target = garList.filter(elem => elem.id == params.gar_id)
            console.log('target ne');
            console.log(target);
            setGarden(target[0])
        } catch (err) {
            console.log(err)
        }
    }
    const loadDevice = async () => {
        try {
            let data = await generateDevice(params.account, params.gar_id, params.device_type)
            // data = data.filter(elem => elem.garPiece == pieceId && elem.type == typ)
            console.log('data ne ');
            console.log(data);
            data = data.map((elem, index) => <DeviceRow key={index} device={elem} />)
            console.log('data row ne');
            console.log(data);
            setDevice(data)
        } catch (err) {
            console(err)
        }
    }
    useEffect(() => {
        loadDevice(), loadGarden()
    }, [])

    // const deviceList = data.map(device => <DeviceRow key={device.type} device={device} />)
    return (

        <div className="row">
            <div className="left col-2"></div>
            <div className="col-8 mx-auto px-5">
                <div className='fs-2 text-center mt-5'>{params.account}/{garden.name}/{device_type}</div>
                <div className='row my-5'>
                    {/* <div className='col-6 text-center my-auto'>Số lượng: 10</div> */}
                    <div className='col-6 text-center my-auto'></div>
                    <div className='col-6 text-center'><AddSensor/></div>
                </div>
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col"><i>ID</i></th>
                            <th scope="col"><i>Tên</i></th>
                            <th scope="col"><i>Tọa độ</i></th>
                            <th scope="col"><i>Thời gian lắp đặt</i></th>
                            <th scope="col"><i>Trạng thái</i></th>
                            <th scope="col" className="text-center"><i>Thao tác</i></th>
                        </tr>
                    </thead>
                    <tbody className="ms-5">
                        {device.slice(currentPage * sensorPerPage - 5, currentPage * sensorPerPage)}
                    </tbody>
                </table>
                <Pagination className='justify-content-center'>
                    <Pagination.First onClick={onFirst} />
                    <Pagination.Prev onClick={onPrev} />
                    <Pagination.Item onClick={() => setCurrentPage(startIndex)} key='first' className={currentPage - startIndex === 0 ? 'active' : ''}>{startIndex}</Pagination.Item>
                    <Pagination.Item onClick={() => setCurrentPage(startIndex + 1)} key='second' className={currentPage - startIndex === 1 ? 'active' : ''}>{startIndex + 1}</Pagination.Item>
                    <Pagination.Item onClick={() => setCurrentPage(startIndex + 2)} key='third' className={currentPage - startIndex === 2 ? 'active' : ''}>{startIndex + 2}</Pagination.Item>
                    <Pagination.Next onClick={onNext} />
                    <Pagination.Last onClick={onLast} />
                </Pagination>
            </div>
            <div className="right col-2"></div>
        </div>


    )
}

export default ManageDevice