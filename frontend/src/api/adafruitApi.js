import axios from 'axios';

const URL = 'https://io.adafruit.com/api/v2/Thientran/feeds';
export const getCurValueTemp = async () => {
  const temp = await axios.get(`${URL}/nhietdo`).then(res => res.data['last_value']).catch((err) => (err))
  const humidity = await axios.get(`${URL}/doam`).then(res => res.data['last_value']).catch((err) => (err))
  const soil = await axios.get(`${URL}/doamdat`).then(res => res.data['last_value']).catch((err) => (err))
  const light = await axios.get(`${URL}/anhsang`).then(res => res.data['last_value']).catch((err) => (err))
  const pump = await axios.get(`${URL}/battatmaybom`).then(res => res.data['last_value']).catch((err) => (err))
  const data = {
    "temp":temp,
    "humidity":humidity,
    "soil":soil,
    "light":light,
    "pump":pump
  }
  return data
}

export const getCurValuePump = async () => {
  return await axios.get(`${URL}/maybom`).then(res => res.data['last_value']).catch((err) => console.log(err))
}