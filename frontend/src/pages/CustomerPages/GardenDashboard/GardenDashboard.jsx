import classnames from 'classnames/bind'
import styles from './GardenDashboard.module.scss'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../../components/GlobalStyles/SideBar';
import { useEffect, useState } from 'react';
import { getCurValueTemp } from '../../../api/adafruitApi';
import { getThreshold } from '../../../api/deviceApi';
import { getAllRecord } from '../../../api/recordApi';

const cx = classnames.bind(styles);
// const data = {
//         minTemp:"25",
//         maxTemp:"35",
//         soil:"30",
//         maxSoil:"40"
//     };
// const dataSensor = {
//     temp:'30',
//     humidity:'40',
//     lux:'150',
//     soilMoisture:'30'
// }
const infor = {
    days:"10",
    hours:"60"
}
const GardenDashboard = () => {

    const [data,setData] = useState({});
    const [hour,setHour] = useState("")
    const [day,setDay] = useState("");
    const [threshold,setThreshold] = useState({
        minTemp:"",
        maxTemp:"",
        soil:"",
        maxSoil:""
    })
    const user = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(location.state)setThreshold(location.state)
        else{
            getThreshold().then((res) => setThreshold(res)).catch((err)=>console.log(err))
        }
        const getTemp = async () => {
            return await getAllRecord().then(res =>{
                setData({
                    temp: res.find(obj => obj.type === 'temp').curValue,
                    humidity: res.find(obj => obj.type === 'air').curValue,
                    soil: res.find(obj => obj.type === 'soil').curValue,
                    light: res.find(obj => obj.type === 'light').curValue,
                })
                const valueListLight = res.find(obj => obj.type === 'light').valueList
                console.log(valueListLight)
                const startDay = new Date(valueListLight[1]['log_time']);
                const cur = new Date(valueListLight[valueListLight.length-1]['log_time'])
                setDay(Math.ceil((cur.getTime() - startDay.getTime())/(1000 * 3600 * 24)))
                const listDay = valueListLight.filter(obj => new Date(obj.log_time).toISOString().substring(0,10) === new Date().toISOString().substring(0,10))
                let sumLux = 0;
                listDay.forEach((obj) => {sumLux += Number(obj.value)})
                if(listDay.length > 0){
                    setHour(Math.ceil(sumLux/(listDay.length)))
                }
                // {
                //     if(new Date(obj.log_time).getDate() === new Date("2023-04-25").getDate()) console.log(obj)
                // }
            }).catch((err) => console.log(err))
        }
        getTemp()
        const interval = setInterval(() => getTemp(),2000)
        return () => {
            clearInterval(interval);
        }
    },[])

    const returnGardenDetail = () => {
        navigate(`/${user.account}/garden-detail/${user.garden_id}`)
      }

    return (
        <Container>
            <Row>
                <SideBar position="garden" account={user.account}/>
                <Col xs='8' >
                <i className="fa-solid fa-arrow-left" onClick={returnGardenDetail}></i>
                    <h1 className={cx('title')}>Giám sát khu vườn</h1>
                    <Row className='my-4'>
                        <Col>
                            <div className={cx('sensor')}>  
                                <div className='info-dis'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="red" d="M8 5a4 4 0 1 1 8 0v5.255a7 7 0 1 1-8 0V5zm1.144 6.895a5 5 0 1 0 5.712 0L14 11.298V5a2 2 0 1 0-4 0v6.298l-.856.597zm1.856.231V5h2v7.126A4.002 4.002 0 0 1 12 20a4 4 0 0 1-1-7.874zM12 18a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"/></svg>
                                    <h3>Nhiệt độ</h3>
                                </div>                               
                                <div className={cx('value-dis')}>
                                    <p className={cx('text')}>{data.temp} &#8451;</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('sensor')}>  
                                <div className='info-dis'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 30 30"><path fill="blue" d="M7.56 17.19c0-.88.24-1.89.72-3.03s1.1-2.25 1.86-3.31c1.56-2.06 2.92-3.62 4.06-4.67l.75-.72c.25.26.53.5.83.72c.41.42 1.04 1.11 1.88 2.09s1.57 1.85 2.17 2.65c.71 1.01 1.32 2.1 1.81 3.25s.74 2.16.74 3.03c0 1-.19 1.95-.58 2.86c-.39.91-.91 1.7-1.57 2.36c-.66.66-1.45 1.19-2.37 1.58c-.92.39-1.89.59-2.91.59c-1 0-1.95-.19-2.86-.57c-.91-.38-1.7-.89-2.36-1.55c-.66-.65-1.19-1.44-1.58-2.35s-.59-1.89-.59-2.93zm2.26-2.93c0 .83.17 1.49.52 1.99c.35.49.88.74 1.59.74c.72 0 1.25-.25 1.61-.74c.35-.49.53-1.15.54-1.99c-.01-.84-.19-1.5-.54-2c-.35-.49-.89-.74-1.61-.74c-.71 0-1.24.25-1.59.74c-.35.5-.52 1.16-.52 2zm1.57 0v-.35c0-.08.01-.19.02-.33s.02-.25.05-.32s.05-.16.09-.24c.04-.08.09-.15.15-.18c.07-.04.14-.06.23-.06c.14 0 .25.04.33.12s.14.21.17.38c.03.18.05.32.06.45s.01.3.01.52c0 .23 0 .4-.01.52s-.03.27-.06.45c-.03.17-.09.3-.17.38s-.19.12-.33.12c-.09 0-.16-.02-.23-.06a.335.335 0 0 1-.15-.18c-.04-.08-.07-.17-.09-.24c-.02-.08-.04-.19-.05-.32c-.01-.14-.02-.25-.02-.32v-.34zm.59 7.75h1.32l4.99-10.74h-1.35l-4.96 10.74zm4.3-2.99c.01.84.2 1.5.55 2c.35.49.89.74 1.6.74c.72 0 1.25-.25 1.6-.74c.35-.49.52-1.16.53-2c-.01-.84-.18-1.5-.53-1.99c-.35-.49-.88-.74-1.6-.74c-.71 0-1.25.25-1.6.74c-.36.49-.54 1.15-.55 1.99zm1.57 0c0-.23 0-.4.01-.52s.03-.27.06-.45s.09-.3.17-.38s.19-.12.33-.12c.09 0 .17.02.24.06c.07.04.12.1.16.19c.04.09.07.17.1.24s.04.18.05.32l.01.32v.69l-.01.32l-.05.32l-.1.24l-.16.19l-.24.06c-.14 0-.25-.04-.33-.12s-.14-.21-.17-.38c-.03-.18-.05-.33-.06-.45s-.01-.3-.01-.53z"/></svg>
                                    <h3>Độ ẩm</h3>
                                </div>                               
                                <div className={cx('value-dis')}>
                                    <p className={cx('text')}>{data.humidity} &#37;</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('sensor')}>  
                                <div className='info-dis'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 256 256"><path fill="yellow" d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64Zm-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48ZM58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z"/></svg>
                                    <h3>Ánh sáng</h3>
                                </div>                               
                                <div className={cx('value-dis')}>
                                    <p className={cx('text')}>{data.light} lx</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('sensor')}>  
                                <div className='info-dis'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 30 30"><path fill="brown" d="M7.56 17.19c0-.88.24-1.89.72-3.03s1.1-2.25 1.86-3.31c1.56-2.06 2.92-3.62 4.06-4.67l.75-.72c.25.26.53.5.83.72c.41.42 1.04 1.11 1.88 2.09s1.57 1.85 2.17 2.65c.71 1.01 1.32 2.1 1.81 3.25s.74 2.16.74 3.03c0 1-.19 1.95-.58 2.86c-.39.91-.91 1.7-1.57 2.36c-.66.66-1.45 1.19-2.37 1.58c-.92.39-1.89.59-2.91.59c-1 0-1.95-.19-2.86-.57c-.91-.38-1.7-.89-2.36-1.55c-.66-.65-1.19-1.44-1.58-2.35s-.59-1.89-.59-2.93zm2.26-2.93c0 .83.17 1.49.52 1.99c.35.49.88.74 1.59.74c.72 0 1.25-.25 1.61-.74c.35-.49.53-1.15.54-1.99c-.01-.84-.19-1.5-.54-2c-.35-.49-.89-.74-1.61-.74c-.71 0-1.24.25-1.59.74c-.35.5-.52 1.16-.52 2zm1.57 0v-.35c0-.08.01-.19.02-.33s.02-.25.05-.32s.05-.16.09-.24c.04-.08.09-.15.15-.18c.07-.04.14-.06.23-.06c.14 0 .25.04.33.12s.14.21.17.38c.03.18.05.32.06.45s.01.3.01.52c0 .23 0 .4-.01.52s-.03.27-.06.45c-.03.17-.09.3-.17.38s-.19.12-.33.12c-.09 0-.16-.02-.23-.06a.335.335 0 0 1-.15-.18c-.04-.08-.07-.17-.09-.24c-.02-.08-.04-.19-.05-.32c-.01-.14-.02-.25-.02-.32v-.34zm.59 7.75h1.32l4.99-10.74h-1.35l-4.96 10.74zm4.3-2.99c.01.84.2 1.5.55 2c.35.49.89.74 1.6.74c.72 0 1.25-.25 1.6-.74c.35-.49.52-1.16.53-2c-.01-.84-.18-1.5-.53-1.99c-.35-.49-.88-.74-1.6-.74c-.71 0-1.25.25-1.6.74c-.36.49-.54 1.15-.55 1.99zm1.57 0c0-.23 0-.4.01-.52s.03-.27.06-.45s.09-.3.17-.38s.19-.12.33-.12c.09 0 .17.02.24.06c.07.04.12.1.16.19c.04.09.07.17.1.24s.04.18.05.32l.01.32v.69l-.01.32l-.05.32l-.1.24l-.16.19l-.24.06c-.14 0-.25-.04-.33-.12s-.14-.21-.17-.38c-.03-.18-.05-.33-.06-.45s-.01-.3-.01-.53z"/></svg>
                                    <h3>Độ ẩm đất</h3>
                                </div>                               
                                <div className={cx('value-dis')}>
                                    <p className={cx('text')}>{data.soil} &#37;</p>
                                </div>
                            </div>
                        </Col>
                        
                        
                    </Row>
                    <Row className='my-5'>
                        <Col>
                            <div className={cx('sensor')}>  
                                <div className={cx('info-dis')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="100" height="100" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /> </svg>
                                    <h3>Ngày sinh trưởng</h3>
                                </div>                               
                                <div className={cx('value-dis')}>
                                    <p className={cx('text')}>{day} ngày</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('sensor')}>  
                                <div className={cx('info-dis')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="icon" aria-hidden="true" focusable="false" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/>
                                    </svg>
                                    <h3>Lượng nắng trung bình</h3>
                                </div>                               
                                <div className={cx('value-dis')}>
                                    <p className={cx('text')}>{hour} lux</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className={cx('value-notify')}>
                        <Col xs='5' className={cx('value')}>
                            <h4>Nhiệt độ tối thiểu: {threshold.minTemp}</h4>
                        </Col>
                        <Col xs='5' className={cx('value')}>
                            <h4>Nhiệt độ tối đa: {threshold.maxTemp}</h4>
                        </Col>
                        <Col xs='5' className={cx('value')}>
                            <h4>Độ ẩm đất cần duy trì: {threshold.soil}</h4>
                        </Col>
                        <Col xs='5' className={cx('value')}>
                            <h4>Độ ẩm đất tối đa: {threshold.maxSoil}</h4>
                        </Col>
                        <Col xs={{span:2, offset:9 }} className='mb-3'>
                            {/* <Link to={{pathname:`../${user.account}/InputValue`, state: { prevPath: location.pathname }}}> */}
                                <Button variant="success" onClick={() => {navigate(`../${user.account}/InputValue/${user.garden_id}`,{state: { prevPath: location.pathname}} )}}>Thiết Lập</Button>
                            {/* </Link>      */}
                        </Col> 
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default GardenDashboard;