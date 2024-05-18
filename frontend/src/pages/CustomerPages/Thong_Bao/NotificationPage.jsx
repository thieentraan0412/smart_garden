import classnames from 'classnames/bind'
import styles from './NotificationPage.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Stack, Pagination} from 'react-bootstrap'
import Notification from './Notification';
import SideBar from '../../../components/GlobalStyles/SideBar';
import { getNotificationList } from '../../../api/notificationApi';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

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

function NotificationPage() {
  const [notifications, setNotifications] = useState([])
  const [ notiShow, setNotiShow ] = useState([])
  const realTime = useRef(true)
  const params = useParams()
  const onDelete = function () {
    loadData()
  }

  const [ lastPage, setLastPage ] = useState(1)
  const notiPerPage = 5


  const loadData = async function () {
    await getNotificationList(params.account).then((result) => {
      result.sort(function (a,b) {
        if (a.isRead && !b.isRead) {
          return 1
        }
        else if (!a.isRead && b.isRead) {
          return -1
        }
        else if (a.isRead && b.isRead) {
          return (a.time > b.time) ? -1 : 1
        }
        else {
          if (a.urgent && !b.urgent) {
            return -1
          }
          else if (!a.urgent && b.urgent) {
            return 1
          }
          else {
            return (a.time > b.time) ? -1 : 1
          }
        }
      })

    const newLastPage = Math.ceil(result.length / 5)

    const newNotiShow = Array.from({length : newLastPage * 5}, (_, i) => i + 1).map((i) => {
      if (i <= result.length) {
        return result[i - 1];
      }
      else {
        return undefined;
      }
    })

    setLastPage(newLastPage)
    setNotifications(result)
    setNotiShow(newNotiShow)
    })
  }

  useEffect(() => {
    const socket = io('http://localhost:3030')
    socket.emit('notify', params.account)
    socket.on('connect_error', (error) => {
      console.log('Connection error:', error);
    });
    socket.on('connect_timeout', (timeout) => {
      console.log('Connection timeout:', timeout);
    });
    socket.on('newNotify', () => {
      if (realTime.current) loadData()
    })
    loadData()
    return () => {
      socket.disconnect()
    }
  },[])

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
    let type = document.getElementById("notificationType").value;

    let time = document.getElementById("date").value;

    let isRead =  document.getElementById("status").value;
    isRead = isRead === "true" ? true
      : isRead === "false" ? false
      : "DEFAULT";


    const res = notifications.filter((nt) => {
      if (type !== "DEFAULT" && nt.type !== type) {
        return false;
      }
      if (time) {
        let notiDate = new Date(nt.time)
        let filterDate = new Date(time)
          if (!isSameDate(notiDate, filterDate)) return false;
      }
      if (isRead !== "DEFAULT" && nt.isRead !== isRead) {
        return false;
      }
      return true;
    })

    const newLastPage = Math.ceil(res.length / 5)
   
    const newNotiShow = Array.from({length : newLastPage * 5}, (_, i) => i + 1).map((i) => {
      if (i <= res.length) {
        return res[i - 1];
      }
      else {
        return undefined;
      }
    })

    setCurrentPage(1)
    setStartIndex(1)

    realTime.current = false
    setLastPage(newLastPage)
    setNotiShow(newNotiShow)
  }

  const handleReset = function (e) {
    const type = document.getElementById("notificationType");
    const time = document.getElementById("date");
    const isRead =  document.getElementById("status");

    type.value = "DEFAULT"
    time.value = time.defaultValue
    isRead.value = "DEFAULT"

    realTime.current = true
    setCurrentPage(1)
    setStartIndex(1)
    loadData()
  }

  return (
    <div className="row mx-auto container">
      <SideBar position="notify" account={params.account} />
      <div className='col-xl-9 col-md-9 mt-5 mx-auto'>
          <h1 className="text-center">Thông báo</h1>
          
          <h5>Tìm kiếm: </h5>
          <Form className={cx("search-form")}>
              <Stack direction='horizontal' gap={5} className="justify-content-evenly">
                  <Form.Group controlId="notificationType">
                      <Form.Label>Loại thông báo</Form.Label>
                      <Form.Select size="sm">
                        <option value={"DEFAULT"}>{'-----Vui lòng chọn-----'}</option>
                        <option value={"Temperature"}>Nhiệt độ</option>
                        <option value={"Air Humidity"}>Độ ẩm không khí</option>
                        <option value={"Soil Humidity"}>Độ ẩm đất</option>
                        <option value={"Harvest"}>Thu hoạch</option>
                        <option value={"Device"}>Thiết bị</option>
                      </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="date">
                    <Form.Label>Ngày</Form.Label>
                    <Form.Control size='sm' type="date"></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="status">
                      <Form.Label>Trạng thái</Form.Label>
                      <Form.Select size="sm">
                        <option value={"DEFAULT"}>{'-----Vui lòng chọn-----'}</option>
                        <option value={false}>Chưa đọc</option>
                        <option value={true}>Đã đọc</option>
                      </Form.Select>
                  </Form.Group>

                  <Button size='lg' variant='primary' onClick={handleClick}>Lọc</Button>
                  <Button size='lg' variant='secondary' onClick={handleReset}>Reset</Button>
              </Stack>
          </Form>

          <Row className={cx('title')}>
            <Col md={{span: 4, offset:1}}>Tiêu đề</Col>
            <Col md={{span: 3}}>Thời gian</Col>
            <Col md={{span: 3}}>Trạng thái</Col>
          </Row>
          <hr />

          {
            notiShow.slice(currentPage * notiPerPage - 5, currentPage * notiPerPage).map((notification, i) => { 
              if (notification) {
                return <Notification key={notification._id} id={notification._id} type={notification.type} urgent={notification.urgent}
                isReadN={notification.isRead} measure={notification.measure} threshold={notification.threshold}
                time={notification.time} gardenName={notification.gardenName} x={notification.coordinates.x}
                y={notification.coordinates.y} onDelete={onDelete}/>
              }
              else {
                return <Row key={i} className='my-3' style={{height : '24px'}}></Row>
              }
            }
            )
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

export default NotificationPage