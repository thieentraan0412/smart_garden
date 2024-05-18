import axios from 'axios'

const URL = 'http://localhost:3030/api/request'

export const registerGardenRequest = async (props) =>{
    return await axios.post(`${URL}/regis-gar`, props)
        .then((res) => true)
        .catch((err) => alert('Failure!!!', err));
}

export const modifyGardenRequest = async (props) =>{
    return await axios.post(`${URL}/modify-gar`, props)
        .then((res) => true)
        .catch((err) => alert('Failure!!!', err));
}

export const deleteGardenRequest = async (props) =>{
    console.log('delete')
    return await axios.post(`${URL}/del-gar`, props)
        .then((res) => true)
        .catch((err) => alert('Failure!!!', err));
}


export const getRequestList = async () => {
    return await axios.get(`${URL}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}

export const hideRequest = async (data) => {
    console.log('hide request ne');
    console.log(data);
    return await axios.post(`${URL}`, data)
        .then((res) => true)
        .catch((err) => alert('Failure!!!', err));
}