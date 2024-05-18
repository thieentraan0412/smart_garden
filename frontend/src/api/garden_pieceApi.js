import axios from 'axios'

const URL = 'http://localhost:3030/api/garden-piece'
export const getPieceList = async () =>{
    return await axios.get(`${URL}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}

export const getPrivatePiece = async (owner) =>{
    return await axios.get(`${URL}/${owner}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}

export const getPieceById = async (id)=>{
    return await axios.get(`${URL}/detail/${id}`)
        .then((res) =>  res.data)
        .catch((err) => alert('Failure!!!', err));
}

export const delPieceById = async (id)=>{
    return await axios.delete(`${URL}/delete/${id}`)
        .then((res) => true)
        .catch((err)=>alert('Failure!!!', err))
}

export const handleRequest = async (data) => {
    return await axios.post(`${URL}`, data)
        .then((res) => true)
        .catch((err) => alert('Failure!!!', err))
}