import RequestRow from "./RequestRow";
import data from "../requestData.js";
import AddGarden from "./AddGarden";
import UpdateGarden from "./UpdateGarden";
import DeleteGarden from "./DeleteGarden";
import SideBar from "../../../components/GlobalStyles/AdminSideBar";
import "../Admin.css";
import { useState, useEffect } from 'react';
import { getRequestList } from "../../../api/requestApi"
import { Pagination } from 'react-bootstrap'
function ManageRequest() {
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
    const [request, setRequest] = useState([])
    const loadRequest = async () => {
        try {
            let listOfRequest = await getRequestList()
            listOfRequest = listOfRequest.filter(request => request.isHidden == false)
            console.log('request list ne')
            console.log(listOfRequest);
            listOfRequest = listOfRequest.map((item, index) => <RequestRow key={index} request={item} />)
            listOfRequest = listOfRequest.reverse()
            setRequest(listOfRequest)
            
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadRequest()
    }, [])
    const requestList = data.map(request => < RequestRow key={request.id} request={request} />);
    return (
        <div className="row container mx-auto">
            <SideBar position="request" />
            <div className="col-xl-9 col-md-9 mt-5 px-5 mx-auto">
                <h1 className="text-center fw-bold">Yêu cầu của khách hàng</h1>
                <table className="table align-middle mx-auto">
                    <thead>
                        <tr>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Người gửi</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {requestList} */}
                        {request.slice(currentPage * sensorPerPage - 5, currentPage * sensorPerPage)}
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

export default ManageRequest;