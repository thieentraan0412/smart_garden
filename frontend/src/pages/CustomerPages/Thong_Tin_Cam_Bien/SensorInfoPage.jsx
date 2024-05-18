import classnames from 'classnames/bind'
import styles from './SensorInfoPage.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Stack, Pagination} from 'react-bootstrap'
import SensorInfo from './SensorInfo';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../../components/GlobalStyles/SideBar';
import { getDeviceList } from '../../../api/deviceApi';


const cx = classnames.bind(styles);

function isSameDate(date1, date2) {
  if (date1.getFullYear() !== date2.getFullYear())
    return false
  if (date1.getMonth() !== date2.getMonth())
    return false
  if (date1.getDate() !== date2.getDate())
    return false
  return true
}

function SensorInfoPage() {
  const navigate = useNavigate()

  const [ sensorShow, setSensorShow ] = useState([])
  const [ sensorList, setSensorList ] = useState([])
  const [ lastPage, setLastPage ] = useState(1)
  const params = useParams()
  const sensorPerPage = 5

  const loadData = async function () {
    const res = await getDeviceList(params.account).then((res) => {
        return res.filter(elem => elem.garPiece === parseInt(params.garden_id))
    })

    const newLastPage = Math.ceil(res.length / 5)
   
    const newSensorShow = Array.from({length : newLastPage * 5}, (_, i) => i + 1).map((i) => {
      if (i <= res.length) {
        return res[i - 1];
      }
      else {
        return undefined;
      }
    })

    setLastPage(newLastPage)
    setSensorList(res)
    setSensorShow(newSensorShow)
  }

  useEffect(() => {
    loadData()
  }, [])

  // const emptyRow = (
  //   <Row className='my-3' style={{height : '32px'}}></Row>
  // )
  
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
    setStartIndex(lastPage >= 3 ? lastPage - 2 : 1)
  }

  const handleClick = function (e) {
    e.preventDefault();
    let name = document.getElementById("sensorName").value;
    let type = document.getElementById("sensorType").value;
    let time = document.getElementById("date").value;
    let status =  document.getElementById("status").value;
    status = status === "true" ? true
      : status === "false" ? false
      : "DEFAULT";


    const res = sensorList.filter((sensor) => {
      if (type !== "DEFAULT" && sensor.type !== type) {
        return false;
      }
      if (name && sensor.name !== name) return false;
      if (time) {
        let installDate = new Date(sensor.install_date)
        let filterDate = new Date(time)
        if (!isSameDate(installDate, filterDate)) return false;
      }
      if (status !== "DEFAULT" && sensor.status !== status) {
        return false;
      }
      return true;
    })

    const newLastPage = Math.ceil(res.length / 5)
   
    const newSensorShow = Array.from({length : newLastPage * 5}, (_, i) => i + 1).map((i) => {
      if (i <= res.length) {
        return res[i - 1];
      }
      else {
        return undefined;
      }
    })

    setLastPage(newLastPage)
    setSensorShow(newSensorShow)
  }

  const handleReset = function (e) {
    const name = document.getElementById("sensorName");
    const type = document.getElementById("sensorType");
    const time = document.getElementById("date");
    const isRead =  document.getElementById("status");

    name.value = name.defaultValue
    type.value = "DEFAULT"
    time.value = time.defaultValue
    isRead.value = "DEFAULT"

    loadData()
  }

  const returnGardenDetail = () => {
    navigate(`/${params.account}/garden-detail/${params.garden_id}`)
  }

  return (
    <div className="row mx-auto container">
      <SideBar position="garden" account={params.account} />
      <div className='col-xl-9 col-md-9 mt-5 mx-auto'>
      <i className="fa-solid fa-arrow-left" onClick={returnGardenDetail}></i>
        <h1 className="text-center">Thông tin cảm biến</h1>
        
        <h5>Tìm kiếm: </h5>
        <Form className={cx("search-form")}>
            <Stack direction='horizontal' gap={5} className="justify-content-evenly">
                <Form.Group controlId="sensorName">
                    <Form.Label>Tên sensor</Form.Label>
                    <Form.Control size="sm" placeholder='Nhập tên vào đây'></Form.Control>
                </Form.Group>

                <Form.Group controlId="sensorType">
                    <Form.Label>Loại sensor</Form.Label>
                    <Form.Select size="sm">
                      <option value={"DEFAULT"}>{'-----Vui lòng chọn-----'}</option>
                      <option value={"temp"}>Nhiệt độ</option>
                      <option value={"air"}>Độ ẩm không khí</option>
                      <option value={"soil"}>Độ ẩm đất</option>
                      <option value={"light"}>Ánh sáng</option>
                      <option value={"pump"}>Máy bơm</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="date">
                  <Form.Label>Ngày lắp đặt</Form.Label>
                  <Form.Control size='sm' type="date"></Form.Control>
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Select size="sm">
                      <option value={"DEFAULT"}>{'-----Vui lòng chọn-----'}</option>
                      <option value={true}>Bình thường</option>
                      <option value={false}>Đang bảo trì</option>
                    </Form.Select>
                </Form.Group>

                <Button size='lg' variant='primary' onClick={handleClick}>Lọc</Button>
                <Button size='lg' variant='secondary' onClick={handleReset}>Reset</Button>
            </Stack>
        </Form>

        <Row className={cx('title')}>
          <Col md={{span: 3, offset:1}}>Tên sensor</Col>
          <Col md={{span: 2}}>Hàng</Col>
          <Col md={{span: 2}}>Cột</Col> 
          <Col md={{span: 2}}>Thời gian lắp đặt</Col>
          <Col md={{span: 2}}>Trạng thái</Col>
        </Row>
        <hr />

        {
        sensorShow.slice(currentPage * sensorPerPage - 5, currentPage * sensorPerPage).map((sensor, i) => {
          if (sensor) {
            return <SensorInfo key={i} type={sensor.type} name={sensor.name} x={sensor.coordinates.x} y={sensor.coordinates.y} install_date={sensor.install_date} status={sensor.status} />
          }
          else {
            return <Row key={i} className='my-3' style={{height : '24px'}}></Row>
          }
        })
        }
        
        <Pagination className='justify-content-center'>
          <Pagination.First onClick={onFirst} />
          <Pagination.Prev onClick={onPrev}/>
          <Pagination.Item onClick={()=>setCurrentPage(startIndex)} key='first' className={currentPage - startIndex === 0 ? 'active' : ''}>{startIndex}</Pagination.Item>
          {lastPage > 1 && <Pagination.Item onClick={()=>setCurrentPage(startIndex + 1)} key='second' className={currentPage - startIndex === 1 ? 'active' : ''}>{startIndex + 1}</Pagination.Item>}
          {lastPage > 2 && <Pagination.Item onClick={()=>setCurrentPage(startIndex + 2)} key='third' className={currentPage - startIndex === 2 ? 'active' : ''}>{startIndex + 2}</Pagination.Item>}
          <Pagination.Next onClick={onNext} />
          <Pagination.Last onClick={onLast}/>
        </Pagination>
      </div>
    </div>
  )
}

export default SensorInfoPage