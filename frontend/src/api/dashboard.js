import axios from 'axios'

const URL = 'http://localhost:3030/api/dashboard'

export const getCurThreshold = async () => {
    return await axios.get(`${URL}/threshold`).then((res) => res.data).catch((err) => console.log(err))
}