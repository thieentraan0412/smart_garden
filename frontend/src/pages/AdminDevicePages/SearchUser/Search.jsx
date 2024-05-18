import { getUserList } from '../../../api/userApi';
import SideBar from '../SideBar';
import "./Search.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

function Search() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const loadData = async () => {
        try {
            let data = await getUserList()
            data = data.filter(user => user.role == "customer")
            console.log("data")
            console.log(data)
            setUsers(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    function handleClick() {
        const account = document.getElementById("account").value
        if (!account)
            alert("Tài khoản không được để trống")
        else {
            // if (users.find(account) != undefined)
            //     navigate(`/tech/${account}`)
            // else 
            //     alert("Tài khoản không tồn tại trên hệ thống")
            let flag = true
            for (const idx in users) {
                console.log("elem")
                console.log(users[idx])
                if (users[idx].account == account) {
                    flag = false
                    navigate(`/tech/${account}`)
                }

            }
            if (flag)
                alert("Tài khoản không tồn tại trên hệ thống")
        }
    }
    return (
        <div className='row'>
            <div className="left col-2"></div>
            <div className="col-8">
                <div className="box text-center align-items-center">
                    <input
                        type="text"
                        className="form-control w-100 mx-auto"
                        id="account"
                        placeholder="Nhập số điện thoại hoặc tài khoản khách hàng"
                    ></input>
                    <button
                        className="btn btn-success my-5"
                        onClick={handleClick}
                    >Tìm kiếm <i className="fa-solid fa-magnifying-glass  ms-5 fs-3"></i>
                    </button>
                </div>
            </div>
            <div className="right col-2"></div>
        </div>
    )
}

export default Search