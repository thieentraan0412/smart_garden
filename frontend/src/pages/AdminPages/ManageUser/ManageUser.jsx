import search from "../../../assets/search.png";
import data from "../userData.js";
import UserRow from "./UserRow";
import AddUser from "./AddUser";
import SideBar from "../../../components/GlobalStyles/AdminSideBar";
import { Pagination } from 'react-bootstrap'
// import "../Admin.css";
import { useState, useEffect } from 'react';
import { getUserList } from "../../../api/userApi"
function ManageUser() {
    const lastPage = 5
    const sensorPerPage = 5
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
        setStartIndex(lastPage - 2)
    }
    const [user, setUser] = useState([])
    const [renderUser, setRenderUser] = useState([])
    const loadUser = async () => {
        try {
            let listOfUser = await getUserList()
            listOfUser = listOfUser.filter(user => user.role == "customer" && !user.isDelete)
            console.log(('list of user ne'))
            console.log(listOfUser)
            setUser(listOfUser)
            console.log('renderList ne');
            const renderList = listOfUser.map((item, index) => <UserRow key={index} user={item} />)
            console.log(renderList);
            console.log('end renderList ne');
            setRenderUser(renderList)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadUser()
    }, [])
    const handleSearch = (e) => {
        let key = document.getElementById('search_key').value
        // alert(key)
        if (!key) {
            const newUserList = user.map((item, index) => <UserRow key={index} user={item} />)
            setRenderUser(newUserList)
        } else {
            const targetUser = user.filter(item => item.account == key || item.phone == key)
            console.log('tim user ne');
            console.log(targetUser[0]);
            if (targetUser.length == 0) {
                console.log('khong thay ne');
                setRenderUser([])
            } else {
                const infor = targetUser.map((item, index) => <UserRow key={index} user={item} />)
                console.log('infor ne');
                console.log(infor);
                setRenderUser([infor])
            }
        }
    }
    // const userList = user.map((item, index) => <UserRow key={index} user={item} />)
    // console.log('userList ne')
    // console.log(userList)
    return (
        <div className="row mx-auto container">
            <SideBar position="user" />
            <div className="col-xl-9 col-md-9 mt-5 mx-auto px-5">
                <h1 className="text-center fw-bold">Quản lý khách hàng</h1>
                <div className="row my-5">
                    <div className="col-5 add-user">
                        {/* <button type="button" className="btn btn-dark btn-lg">Thêm khách hàng</button> */}
                        < AddUser />
                    </div>
                    <div className="col-6 search-user my-auto mx-auto d-flex justify-content-around">
                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Nhập số điện thoại hoặc tên tài khoản"
                            id="search_key"
                        ></input>
                        <button
                            type='submit'
                            className='btn btn-dark'
                            onClick={handleSearch}

                        >Chọn</button>
                    </div>
                </div>
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Tên tài khoản</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col" className="text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="ms-5">
                        {
                            renderUser.slice(currentPage * sensorPerPage - 5, currentPage * sensorPerPage)
                        }
                    </tbody>
                </table>
                <Pagination className='justify-content-center'>
                    <Pagination.First onClick={onFirst} />
                    <Pagination.Prev onClick={onPrev} />
                    <Pagination.Item onClick={() => setCurrentPage(startIndex)} key='first' className={currentPage - startIndex === 0 ? 'active' : ''}>{startIndex}</Pagination.Item>
                    <Pagination.Item onClick={() => setCurrentPage(startIndex + 1)} key='second' className={currentPage - startIndex === 1 ? 'active' : ''}>{startIndex + 1}</Pagination.Item>
                    <Pagination.Item onClick={() => setCurrentPage(startIndex + 2)} key='third' className={currentPage - startIndex === 2 ? 'active' : ''}>{startIndex + 2}</Pagination.Item>
                    <Pagination.Next onClick={onNext} />
                    <Pagination.Last onClick={onLast} />
                </Pagination>
            </div>
        </div>

    );
}

export default ManageUser;