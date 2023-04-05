import axios from 'axios'
import {sendMessage} from "./message";



export const createOrder = (chat,user,adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs, role) => {
    return async dispatch => {

        try {

            console.log(user, chat)
            const response = await axios.post(`https://master43.ru:8443/api/order/createOrder`, {
                adress,
                fio,
                phone,
                type,
                mark,
                timeInUse,
                comment,
                urgency,
                time,
                imgs,
                user
            })
            alert('Заказа на ремонт успешно отправлен ' +'его id '+response.data.order._id)
            window.location.href = "/";
            console.log('no error')
            if (role != 'admin' & user !== 'undefined' & user !== null) {
                dispatch(sendMessage(chat, "", response.data.order._id, user))
                console.log(response.data.order._id)
            }
        } catch (e) {
            console.log('error')
            //alert(e.response.data.message)
        }




    }
}
export const getOrder = (orderId,setMainImg, setAdress, setFio, setPhone, setType, setMark, setTimeInUse, setComment, setTime, setImgs, setUrgency, setUser) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://master43.ru:8443/api/order/getOrder?orderId=${orderId}`, {

            })
            console.log(response.data)
                    setMainImg(response.data.order.imgs[0])
                    setAdress(response.data.order.adress)
                    setFio(response.data.order.fio)
                    setPhone(response.data.order.phone)
                    setType(response.data.order.type)
                    setMark(response.data.order.mark)
                    setTimeInUse(response.data.order.timeInUse)
                    setComment(response.data.order.comment)
                    setTime(response.data.order.time.replace("Z", ""))
                    setImgs(response.data.order.imgs)
                    setUrgency(response.data.order.urgency)

            let user = response.data.order.user!=null?response.data.order.user:'undefined'
            setUser(user)
            console.log(true)
        } catch (e) {
            //alert(e)
        }
    }
}
export async function deleteOrder (UID,setOrders,orders) {
        try {
            const response = await axios.get(`https://master43.ru:8443/api/order/deleteOrder?UID=${UID}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            if (response.data.order)
                setOrders(orders.filter(order => order._id != response.data.order._id))
            console.log(response.data.order)

        } catch (e) {
            //alert(e.response.data.message)
        }
}
export const redactOrder = async (id,adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs) => {
    try {
        console.log('nn eror')
        const response = await axios.post(`https://master43.ru:8443/api/order/redactOrder`, {
            id,
            adress,
            fio,
            phone,
            type,
            mark,
            timeInUse,
            comment,
            urgency,
            time,
            imgs
        })
        console.log(response.data)
        console.log('no eror')
        //alert(response.data.message)
    } catch (e) {
        console.log('eror')
        //alert(e.response.data.message)
    }
}
export function uploadFile(file, UID) {
    return async dispatch => {
        try {
            console.log(UID);
            const formData = new FormData()
            formData.append('file', file)
            formData.append('UID', UID)

            const response = await axios.post(`https://master43.ru:8443/api/prod/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            //dispatch(addFile(response.data))
        } catch (e) {
            //alert(e.response.data.message)
        }
    }
}
export async function getOrders(currentPage,setCurrenPage,setFetching,products,setProducts,setCountPage,pageCount,revers) {
    try {
        let url=`https://master43.ru:8443/api/order/getOrders?currentPage=${currentPage+1}&revers=${revers}`

        const response = await axios.get(url).finally(()=>setFetching(false))
        console.log(response.data)
        console.log(response.data)
        if (revers===true)
            response.data.products.reverse()
        setProducts([...products,...response.data.products])
        setCountPage(pageCount=>response.data.pagination.pageCount)
        setCurrenPage(currentPage=>currentPage+1)
        console.log([...products,...response.data.products])
        return url
        //dispatch(setProducts(response.data.products))
        //dispatch(setPageCount(response.data.pagination.pageCount))

    } catch (e) {
        //alert(e)
    }
}