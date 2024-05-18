import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { MDBContainer } from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './Login.module.scss'
import { useState, useEffect } from 'react';
import loginlogo from '../../../assets/logo.png';
import { getUserList } from '../../../api/userApi';

//component style
const LinkStyled2 = {
    color: "green",
    margin: "10%",
    fontSize: "medium"
}

const inputStyled = {
    width: "90%"
}

const labelStyle = {
    fontSize: "medium"
}

const cx= classNames.bind(styles);

function Login(){
    //api
    const [users,setUsers] = useState([])

    const loadData = async ()=>{
        const data = await getUserList().then((res)=>setUsers(res));
        console.log(data)
        return await getUserList().then((res)=>setUsers(res))
    }

    useEffect(()=>{
        loadData()
    },[])
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [warning,setWarning] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        const auth = users.filter((user) => user.role === params.role)
        if(params.role=='admin'){         
            if(auth.find(ad=>ad.account===username && ad.password===password)) navigate('/admin')
        }
        else if(params.role=='customer'){
            if(auth.find(cus=>cus.account===username && cus.password===password)) navigate(`/${username}`,{state: {owner: username}})
        }
        // params.role
        else{
            if(auth.find(tech=>tech.account===username && tech.password===password)) navigate('/tech')

        }
        setWarning(true)
        setUsername('')
        setPassword('')
    }
    return(
        <div className={cx('wrapped')}>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs='6' className='my-5'>
                        <div className={cx('main')}>
                            <MDBContainer className="mt-5 mb-1 d-flex justify-content-center">
                                <img
                                    src={loginlogo}
                                    className="rounded-circle shadow-4"
                                    style={{ width: "150px" }}
                                    alt="Avatar"
                                />
                            </MDBContainer>

                            <hr />

                            <p>Đăng nhập</p>

                            <div className={cx('login-form')}>
                                <Form className='d-flex align-items-center flex-column' onSubmit={e=>handleSubmit(e)}>
                                    <Form.Group className="mb-3" controlId="username" style={inputStyled}>
                                        <Form.Label style={labelStyle}>Tên đăng nhập</Form.Label>
                                        <Form.Control  type="text" placeholder="type your username" value={username} onChange={e=>setUsername(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password" style={inputStyled}>
                                        <Form.Label style={labelStyle}>Mật khẩu</Form.Label>
                                        <Form.Control  type="password" placeholder="type your password" value={password} onChange={e=>setPassword(e.target.value)} />
                                    </Form.Group>

                                    { warning? <span className="text-danger">Sai tên đăng nhập hoặc mật khẩu</span> : null}
                                    <Button variant="success" type="submit" className={cx('btn')}>
                                        Đăng nhập
                                    </Button>
                                </Form>
                                
                            </div>

                            <Link style={LinkStyled2} to='/register'>
                                Yêu cầu đăng ký tài khoản!
                            </Link>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;