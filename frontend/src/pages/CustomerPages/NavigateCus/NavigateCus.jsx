import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NavigateCus(){

    const navigate = useNavigate()

    useEffect(()=>{
        navigate('/login-as')
    })

    return(
        <></>
    )
}

export default NavigateCus;