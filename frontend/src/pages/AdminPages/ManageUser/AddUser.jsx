import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserList, postRegisterRequest } from '../../../api/userApi';
function AddUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //getUser
    const [users, setUsers] = useState([])
    const loadData = async () => {
        return await getUserList().then((res) => setUsers(res))
    }
    useEffect(() => {
        loadData()
    }, [])
    //form data
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //navigate
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name) {
            alert("Tên không được để trống") 
        } else if (!address) {
            alert("Địa chỉ liên hệ không được để trống")
        } else if (!email) {
            alert("Địa chỉ email không được để trống, thông tin này được dùng để lấy lại mật khẩu")
        } else if (!phone) {
            alert("Số điện thoại không được để trống, thông tin này được dùng để lấy lại mật khẩu")
        } else if (!username) {
            alert("Tên đăng nhập không được để trống")
        } else if (!password) {
            alert("Mật khẩu không được để trống")
        } else {
            const data = {
                name: name,
                date: birth,
                address: address,
                email: email,
                phone: phone,
                account: username,
                password: password
            }
            let dup = false
            // const auth = users.filter((user) => user.role === 'customer')
            const auth = users
            if (auth.find(ad => ad.account === username)) {
                alert('Tên đăng nhập đã tồn tại')
                dup = true;
            }

            if (!dup && auth.find(ad => ad.email === email)) {
                alert('Email đã được sử dụng')
                dup = true;
            }

            if (!dup && auth.find(ad => ad.phone === phone)) {
                alert('Số điện thoại đã được sử dụng')
                dup = true;
            }

            if (!dup) {
                const x = postRegisterRequest(data)
                if (x) {
                    alert('Đăng kí thành công')
                    location.reload();
                    // navigate('/admin')
                }
            }    
        }
    }
    return (
        <>
            <Button variant="dark" onClick={handleShow} className="btn-lg mx-2">
                Thêm khách hàng
            </Button>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="bg-dark" closeButton>
                    <Modal.Title className="d-flex align-items-center text-white">
                        Thêm khách hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="d-flex my-3 align-items-center">
                            Tên khách hàng:
                            <input
                                type="text"
                                className="form-control w-50 mx-3"
                                placeholder="Nguyen Van A"
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Ngày sinh:
                            <input
                                type="text"
                                className="form-control w-50 mx-3"
                                placeholder="14/12/2003"
                                onChange={e => setBirth(e.target.value)}
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Địa chỉ:
                            <input
                                type="text"
                                className="form-control w-75 mx-3"
                                placeholder=" 268, Lý Thường Kiệt. P. 14, Q. 10"
                                onChange={e => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Email:
                            <input
                                type="email"
                                className="form-control w-50 mx-3"
                                placeholder="nguyenvana123@gmail.com"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Số điện thoại:
                            <input
                                type="tel"
                                className="form-control w-50 mx-3"
                                placeholder="0238647256"
                                onChange={e => setPhone(e.target.value)}
                                required
                                pattern="[1-9]{1}[0-9]{9}"
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Tên tài khoản:
                            <input
                                type="text"
                                className="form-control w-50 mx-3"
                                placeholder="nguyenvana123"
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="d-flex my-3 align-items-center">
                            Mật khẩu:
                            <input
                                type="password"
                                className="form-control w-50 mx-3"
                                min={8}
                                max={20}
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </form>
                    


                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="dark"
                        size="lg"
                        onClick={handleSubmit}>
                        Xác nhận
                    </Button>
                    <Button variant="secondary" onClick={handleClose} size="lg">
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUser;