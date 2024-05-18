import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import classNames from 'classnames/bind';
import styles from './DisplayItem.module.scss'

const cx= classNames.bind(styles);

const DisplayItem = ({items}) => {
  console.log(items)
    return (
        <Container>
          <Row >
                  <Col><h5>Loại cảm biến</h5></Col>
                  <Col><h5>Khu vườn</h5></Col>
                  <Col><h5>Hàng</h5></Col>
                  <Col><h5>Thời gian lắp đặt</h5></Col>
                  <Col><h5>Trạng thái</h5></Col>
          </Row>
          {
            items.map((item) => {
              return(
                <Row key={item.id} className='my-5'>
                  <Col><h5>{item.name}</h5> </Col>
                  <Col><h5>Khu A</h5></Col>
                  <Col><h5>{item.coordinates.x}</h5></Col>
                  <Col><h5>{item.time}</h5></Col>
                  <Col><h5>{item.status?"Bình thường":"Đang hỏng"}</h5></Col>
                </Row>
              )
            })
          }
        </Container>
    );
};

export default DisplayItem;