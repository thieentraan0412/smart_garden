import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DisplayItem from "./DisplayItem";
import FilterItem from "./FilterItem";
import classnames from 'classnames/bind'
import styles from './ManageSensor.module.scss'
import SideBar from "../../../components/GlobalStyles/SideBar";
import { getDeviceList } from "../../../api/deviceApi";
import { useParams } from "react-router-dom";

const cx = classnames.bind(styles);
const data1 = [
    {
        id: "1",
        type: "DHT20",
        garden: "Khu A",
        coordinates:{
            x:1,
            y:2
        },
        time: "2023-03-11",
        status: "Bình thường",
    },
    {
        id: "2",
        type: "Độ ẩm đất",
        garden: "Khu A",
        coordinates:{
            x:1,
            y:2
        },
        time: "2023-03-12",
        status: "Đang hỏng",        
    },
    {
        id: "3",
        type: "Độ ẩm đất",
        garden: "Khu B",
        coordinates:{
            x:1,
            y:2
        },
        time: "2023-03-11",
        status: "Bình thường"
    },
    {
        id: "4",
        type: "Ánh sáng",
        garden: "Khu C",
        coordinates:{
            x:1,
            y:2
        },
        time: "2023-03-10",
        status: "Bình thường"
    },
    {
        id: "5",
        type: "Ánh sáng",
        garden: "Khu C",
        coordinates:{
            x:1,
            y:2
        },
        time: "2023-03-10",
        status: "Đang hỏng"
    }
]
const ManageSensor = () => {
    const user = useParams()
    const [data, setData] = useState(data1);
    const [items,setItem] = useState(data);
    const getData = async () => {
        getDeviceList(user.account).then(res =>  {
            setItem(res)
            setData(res)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        getData();
    },[])
    const filterItem = (filters) => {
        const newItem = data.filter((item) => {
            for(let key in filters){
                if(item[key] === undefined || item[key] !== filters[key])
                return false;
            }
            return true;
        })       
        setItem(newItem);  
      };
    return (
        <Container>
            <Row>
                <SideBar />
                <Col>
                    <FilterItem 
                        filterItem={filterItem}
                        data = {data}
                    />
                    <DisplayItem items={items} />
                </Col>                
            </Row>
        </Container>
    );
};

export default ManageSensor;