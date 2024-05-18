import axios from 'axios'

const URL = 'http://localhost:3030/api/garden'
export const getGardenList = async () =>{
    return await axios.get(`${URL}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}