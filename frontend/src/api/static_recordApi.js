import axios from 'axios'

const URL = "http://localhost:3030/api/record"
export const getRecordList = async (id) => {
    return await axios.get(`${URL}`)
        .then(res => {
            // console.log(res.data.filter(elem => elem.id == id))
            return res.data.filter(elem => elem.id == id)
        })
        .catch((err) => alert('Failure!!!', err))
}