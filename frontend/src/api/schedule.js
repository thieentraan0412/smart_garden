import axios from 'axios';

let URL = 'http://localhost:3030/api/schedulee';
export const postSchedule = async (props) =>{
    console.log(props)
    return await axios.post(`${URL}`, props).then((res)=>{alert('Thêm thành công')}).catch((err) =>console.log(err));;
}

// console.log(URL)
export const getListSchedule = async () => {
    return await axios.get(`${URL}/listSchedule`).then((res) => res.data).catch((err) => console.log(err))
}

export const deleteScheduleById = async (id) => {
    return await axios.delete(`${URL}/${id}`).then(console.log("xoa thanh cong")).catch((err) => console.log(err))
}

export const deleteAll = async () => {
    return await axios.delete(`${URL}`).then(console.log("xoa thanh cong")).catch((err) => console.log(err))
}

export const updateSchedule = async (id,sche) => {
    return await axios.post(`${URL}/${id}`,sche).then(console.log("cap nhat thanh cong")).catch((err) => console.log(err))
}

export const manualPump = async (status,user) => {
    console.log(`${URL}/manualPump/${status}/${user}`)
    return await axios.get(`${URL}/manualPump/${status}/${user}`).then(console.log("OK")).catch((err) => console.log(err))
}