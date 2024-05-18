import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../SideBar';
import { Button, Container, Row, Col } from 'react-bootstrap';
// import classnames from 'classnames/bind'
// const cx = classnames.bind(styles);

import '../SearchUser/Search.css'
import './DeviceType.css'
import sun from "../assets/sun.png"
import temp from "../assets/temp.png"
import soil from "../assets/soil.png"
import air from "../assets/air.png"
import light from "../assets/light.png"
import pump from "../assets/pump.png"
window.TYPE = 0;
import { getPieceList } from "../../../api/garden_pieceApi"
import { useState, useEffect } from 'react';

function DeviceType() {

    const nav = useNavigate()
    const params = useParams()
    const [garden, setGarden] = useState([])
    const loadName = async () => {
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
    useEffect(() => {

        loadName()
    }, [])
    function viewDevice(e) {
        console.log("value")
        console.log(e.target.getAttribute("value"))

        TYPE = e.target.getAttribute("value")
        nav(`/tech/${params.account}/${params.gar_id}/${TYPE}`)
        // console.log("demo");
        // console.log(document.getElementById('demo'));
    }


    return (

        <div className="row">
            <div className="left col-2"></div>
            <div className="col-8">
                <div className='fs-2 text-center mt-5'>{params.account}/{garden.name}</div>
                <div className="text-white text-center">
                    {/* <input type="text" className="form-control w-100 mx-auto" id="account" placeholder="Nhập số điện thoại hoặc tài khoản khách hàng"></input>
                    <div className="btn btn-success my-5" >Tìm kiếm <i className="fa-solid fa-magnifying-glass  ms-5 fs-3"></i></div> */}
                    <div className='d-flex justify-content-evenly my-5'>
                        <div className='item' >
                            <div className='my-4'>
                                <img src={sun} className='image' />
                            </div>
                            <div className='mx-auto my-5' id="demo" value="light" onClick={e => viewDevice(e)}>Cảm biến ánh sáng</div>
                        </div>
                        <div className='item' value="2" >
                            <div className='my-4'>
                                <img src={temp} className='image' />
                            </div>
                            <div className='mx-auto my-5 type' value="temp" onClick={e => viewDevice(e)}>Cảm biến nhiệt độ</div>
                        </div>
                        <div className='item' value="3" >
                            <div className='my-4'>
                                <img src={soil} className='image' />
                            </div>
                            <div className='mx-auto my-5 type' value="soil" onClick={e => viewDevice(e)}>Cảm biến độ ẩm đất</div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-evenly my-5 type'>
                        <div className='item' value="4" >
                            <div className='my-4'>
                                <img src={air} className='image' />
                            </div>
                            <div className='mx-auto my-5' value="air" onClick={e => viewDevice(e)}>Cảm biến không khí  </div>
                        </div>
                        <div className='item' value="5" >
                            <div className='my-4'>
                                <img src={light} className='image' />
                            </div>
                            <div className='mx-auto my-5' value="led" onClick={e => viewDevice(e)}>Đèn thông báo</div>
                        </div>
                        <div className='item' value="6" >
                            <div className='my-4'>
                                <img src={pump} className='image' />
                            </div>
                            <div className='mx-auto my-5' value="pump" onClick={e => viewDevice(e)}>Máy bơm</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right col-2"></div>
        </div>

    )

}
export default DeviceType