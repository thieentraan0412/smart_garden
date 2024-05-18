import axios from 'axios'

const URL = 'http://localhost:3030/api/factory'

export const generateDevice = async (owner, gar_id, type) => {
    return await axios.get(`${URL}/${owner}/${gar_id}/${type}`)
        .then((res) => res.data)
        .catch((err) => alert('Failure!!!', err));
}