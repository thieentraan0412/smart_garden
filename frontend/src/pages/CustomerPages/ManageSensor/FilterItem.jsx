import { useState } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss'

const cx= classNames.bind(styles);

const FilterItem = ({filterItem, data}) => {
    const gardens = [...new Set(data.map((Val) => Val.garden))];
    const types = [...new Set(data.map((Val) => Val.name))];
    const status = [...new Set(data.map((Val) => Val.status))];

    const [filters,setFilter] = useState({});
    const handleReset = () => {
        document.getElementById("type").value = 'DEFAULT';
        document.getElementById("garden").value = 'DEFAULT';
        document.getElementById("status").value = 'DEFAULT';
        document.getElementById("row").value = document.getElementById("row").defaultValue;
        document.getElementById("time").value = new Date();

        setFilter({});
        filterItem({});
    }
    const handleChange = (e) => {
        e.preventDefault();
        console.log("Change")
        const filter = e.target;
        const obj = {};
        obj[filter.id] = filter.value;
        if(filter.id in filters){
            delete filters[filter.id];
            filterItem(filters);
        }
        if(obj[filter.id] !== 'DEFAULT'){
            const  newFilters = {...filters,...obj};
            setFilter(newFilters);
        }
        
    }
const handleClick = () => {
    filterItem(filters);
}
    return (
        <Container>
            <h1>Quản lý cảm biến</h1>
            <Form onSubmit={handleClick}>
            <Row className='form'>
                <Form.Select id='type' className={cx('input-form')} onChange={handleChange}>
                    <option value="DEFAULT">Loại cảm biến</option>
                    {
                        types.map((type) => {
                            return <option value = {type} key = {type}>{type}</option>
                        })
                    }        
                </Form.Select>
                <Form.Select id='garden' className={cx('input-form')} onChange={handleChange}>
                    <option value="DEFAULT">Khu vườn</option>
                    {
                        gardens.map((garden) => {
                            return <option value ={garden} key = {garden}>{garden}</option>
                        })
                    }
                </Form.Select>
                <Form.Control type="number" defaultValue='Hàng' placeholder='Hàng' className={cx('input-form')} id="row" onChange={handleChange}/>                      
                <Form.Control type="date" placeholder='Ngày lắp đặt' className={cx('input-form')} id="time" onChange={handleChange}/>                      
                <Form.Select id='status' className={cx('input-form')} onChange={handleChange}>
                    <option value="DEFAULT">Trạng thái</option>
                    {
                        status.map((status) => {
                            return <option value ={status?"Bình thường":"Hỏng"} key = {status?"Bình thường":"Hỏng"}>{status?"Bình thường":"Hỏng"}</option>
                        })
                    }
                </Form.Select>
                <Button variant='success' onClick={handleClick} className={cx('button')}>Lọc</Button>
                <Button variant='success' onClick={handleReset} className={cx('button')}>Xóa</Button>
            </Row>
                
            </Form>
        </Container>
    );
};

export default FilterItem;