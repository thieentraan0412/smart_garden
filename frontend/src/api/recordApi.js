import axios from 'axios'

const URL = 'http://localhost:3030/api/record'

export const getPrivateRecord = async (garPiece) =>{
    return await axios.get(`${URL}/${garPiece}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export const getRecordList = async (id) => {
    return await axios.get(`${URL}`)
        .then(res => {
            //console.log(res.data.filter(elem => elem.id == id))
            return res.data.filter(elem => elem.id == id)
        })
        .catch((err) => console.log(err))
}

export const getAllRecord= async () => {
    return await axios.get(`${URL}`)
        .then(res => {
            return res.data
        })
        .catch((err) => console.log(err))
}