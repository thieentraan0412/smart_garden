import axios from 'axios'

const URL = 'http://localhost:3030/api/notification'

export const getNotificationList = async (account) =>{
    return await axios.get(`${URL}/${account}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}

export const deleteNotification = async (id) =>{
    const query = URL + '?_id=' + id
    return await axios.delete(`${query}`)
        .then((res) => res.status)
        .catch((err) => alert('Failure!!!', err));
}

export const markReadNotification = async (id) =>{
    const query = URL + '?_id=' + id
    return await axios.patch(`${query}`)
        .then((res) => res.status)
        .catch((err) => alert('Failure!!!', err));
}