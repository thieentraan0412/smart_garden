import axios from 'axios'

const URL = 'http://localhost:3030/api/user'
export const getUserList = async () =>{
    return await axios.get(`${URL}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}

export const getUserbyAccount = async(user) =>{
    return await axios.get(`${URL}/${user}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}

export const postRegisterRequest = async (props) =>{
    return await axios.post(`${URL}`, props)
        .then((res) => true)
        .catch((err) => alert('Failure!!!', err));
}

export const updateUserInfor = async (id, data) => {
    console.log('call api ne');
    console.log(`${URL}/${id}`);
    console.log('data ne');
    console.log(data);
    return await axios.post(`${URL}/${id}`, data)
        .then((res) => true)
        .catch((err) => alert('Failure!!!', err));
} 