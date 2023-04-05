import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import notificationSound from '../components/original-hangouts-sms-tone.mp3';
const audio = new Audio(notificationSound);

export const registration = (email, password) => {
    return async dispatch => {
        console.log(email, password)
        try {
            const response = await axios.post(`https://master43.ru:8443/api/auth/registration`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
            console.log(response.data.user)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://master43.ru:8443/api/auth/login`, {
                email,
                password
            })
            console.log(response.data)
            dispatch(setUser(response.data.user))

            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export async function getNotice (setIsNotice) {
    try {
        const response = await axios.get(`https://master43.ru:8443/api/auth/getNotice`,
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
        if (response.data.notice!='' & response.data.notice!=null & response.data.notice!=undefined & response.data.notice!=0)
        {
            audio.play();
            setIsNotice(response.data.notice)
            setTimeout(() => {
                setIsNotice('');
            }, 5000);
            //alert(response.data.notice)
            console.log(response.data.notice)
        }
    } catch (e) {
        //alert(e.response.data.message)

    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://master43.ru:8443/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response)
        } catch (e) {
            //alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
export const ChangAccountInformation =  (email, password,phone,name) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://master43.ru:8443/api/auth/changeacc`, {
                Firsttoken:`${localStorage.getItem('token')}`,
                email,
                password,
                phone,
                name
            })
            console.log(response.data)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)

        } catch (e) {
            //alert(e.response.data.message)
            //localStorage.removeItem('token')
        }
    }
}