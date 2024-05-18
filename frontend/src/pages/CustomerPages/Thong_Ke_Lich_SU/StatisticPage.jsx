import { useEffect, useState, useRef } from "react";
import { getRecordList } from "../../../api/recordApi.js";
import LineChart from './LineChart.jsx';
import { Row, Col, Form, Button } from "react-bootstrap";
import SideBar from "../../../components/GlobalStyles/SideBar.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Chart from 'chart.js/auto';
import { io } from 'socket.io-client';


function isInInterval(start, end, date) {
  if (date.getFullYear() < start.getFullYear() || date.getFullYear() > end.getFullYear())
    return false
  if (date.getMonth() < start.getMonth() || date.getMonth() > end.getMonth())
    return false
  if (date.getDate() < start.getDate() || date.getDate() > end.getDate())
    return false
  return true
}

function StatisticPage() { 
  const params = useParams()
  const navigate = useNavigate()

  const [ chartData, setChartData ] = useState([])
  const [ dataShow, setDataShow ] = useState([])
  const [ type, setType ] = useState('')
  const realTime = useRef(true)

  const loadData = async function (id) {
    return await getRecordList(id).then((res) => {
      let valueList;
      if (res[0].type === 'pump' || res[0].type === 'led') {
        valueList = res[0].valueList.map((vl) => {
          let newVal;
          if (vl.value === "ON")
            newVal = 1
          else
            newVal = 0 
          return {
            'value' : newVal,
            'log_time' : vl.log_time
          }
        });
      }
      else { 
        valueList = res[0].valueList;
      }

      setType(res[0].type)
      setChartData(valueList)
      const newChartData = valueList.slice(valueList.length - 10, valueList.length).map((data) => {
        return {
          log_time: data.log_time, 
          value: data.value,
        }
      })
      setDataShow(newChartData)
    })
  } 

  const handleChangeDate = (e) => {
      e.preventDefault()
      let start = document.getElementById("start").value
      let end = document.getElementById("end").value
      if (!start)
          alert("Vui lòng nhập ngày bắt đầu")
      else if (!end)
          alert("Vui lòng nhập ngày kết thúc")
      else {
          start = new Date(start)
          end = new Date(end)
          if (start > end)
              alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc")
          else {
              const newChartData = chartData.filter(item => {
                const item_date = new Date(item.log_time)
                if (isInInterval(start, end, item_date)) {
                    return item
                }
              })
              realTime.current = false
              setDataShow(newChartData)
            }
          }
      }

  const resetDate = function (e) {
    e.preventDefault()
    let start = document.getElementById("start")
    let end = document.getElementById("end")
    start.value = start.defaultValue
    end.value = end.defaultValue

    realTime.current = true
    loadData(params.device_id)
  }

  useEffect(() => {
    const socket = io('http://localhost:3030')
    socket.emit('statis', params.account, params.device_id)
    socket.on('connect_error', (error) => {
      console.log('Connection error:', error);
    });
    socket.on('connect_timeout', (timeout) => {
      console.log('Connection timeout:', timeout);
    });
    socket.on('newData', () => {
      console.log(realTime)
      if (realTime.current) {
        console.log(realTime)
        loadData(params.device_id)
      }
    })
    loadData(params.device_id)
    return () => {
      socket.disconnect()
    }
  }, [])

  const containerStyle = {
    width: '80%',
  }
 
  const returnToHistory = () => {
    navigate(`/${params.account}/SensorHistory/${params.garden_id}`)
  }

  return (
    <div className="row mx-auto container">
      <SideBar position="garden" account={params.account} />
      <div className='col-xl-9 col-md-9 mt-5 mx-auto'>
        <i className="fa-solid fa-arrow-left" onClick={returnToHistory}></i>
        <h1 className="text-center">Thống kê lịch sử</h1>

          <Row className="mt-4">
            <Col xs={3}>
                <Form.Group controlId="start">
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control size='sm' type="date"></Form.Control>
                </Form.Group>
            </Col>
            <Col xs={3}>
                <Form.Group controlId="end">
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control size='sm' type="date"></Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Button type='submit' size='lg' variant='primary' onClick={handleChangeDate}>Lọc</Button>
            </Col>
            <Col>
                <Button type='submit' size='lg' variant='secondary' onClick={resetDate}>Reset</Button>
            </Col>
          </Row>

        <div className="d-flex flex-column align-items-center mt-3">
          <LineChart style={containerStyle} chartData={dataShow} type={type}/>
        </div>
      </div>
    </div>
  )
}
export default StatisticPage;