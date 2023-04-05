import React, { useState, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uploadFile} from "../../actions/product";
import "../../components/css/NewProd.css";
import '../../components/css/imgList.css'
import {getOrder, redactOrder} from "../../actions/order";
import {getChats} from "../../actions/message";
import CloseImg from "../../components/image/close_icon.png"

const Order = () => {
    let { id } = useParams();



    const [mainImg, setMainImg] = useState([])
    const [adress, setAdress] = useState("")
    const [fio, setFio] = useState([])
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [timeInUse, setTimeInUse] = useState("")
    const [comment, setComment] = useState("")
    const [time, setTime] = useState(Date.now+1)
    const [imgs, setImgs] = useState([])
    const [user, setUser] = useState('')
    const [urgency,setUrgency] = useState(false)
    const loads=true

    const order = useSelector(state =>state.order)
    //const user=useSelector(state =>state.user.currentUser.id)
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const chat=useSelector(state =>state.chats.chats)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();


    };
    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => {uploadFile(file, user,'orders',setImgs,imgs)})
        console.log(imgs)
        //setImgs(files[0].name)
    }
    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => {uploadFile(file, user?user:'nullUser','orders',setImgs,imgs)})
        setDragEnter(false)
    }

    function delImg(el){
        setImgs(imgs.filter(img => img!=el));
    }

    useEffect(() => {
        dispatch(getChats(user))
        dispatch(getOrder(id,setMainImg, setAdress, setFio,setPhone, setType, setMark, setTimeInUse, setComment, setTime, setImgs, setUrgency,setUser))
    }, [])
    return (
        <div>
            {loads==true ?
                <div className="po4inis">
                    <form className={"ProductForm"} onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                        <div className={"leftBlock"}>
                            <div className="decorateblock">
                            <div className="imgSlot" style={{display: "block"}}>
                                {!dragEnter ?
                                    <form onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                                          onDragOver={dragEnterHandler}>
                                        <div className="mainImg">
                                            <img src={"https://master43.ru:8443/orders/" + user + "/" + mainImg}/>
                                        </div>
                                    </form> :
                                    <div className="mainImg">
                                        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                                             onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                                            Перетащите файлы сюда
                                        </div>
                                    </div>}
                                <div className={"imgList"}>
                                    {imgs.map(el => (
                                        <div className={"additionalImg"}>
                                            <div className="deleteImg">
                                                <img className="deleteImg_img" onClick={()=>delImg(el)} src={CloseImg} alt=''></img>
                                            </div>
                                            <img className="addImg" onMouseEnter={() => setMainImg(el)}
                                                 src={"https://master43.ru:8443/orders/" + user + "/" + el}/>

                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="disk__upload">
                                <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                                <input type="text"
                                       name={'uploader'}
                                       className="form-control"
                                       multiple={true} onChange={(event) => {
                                    fileUploadHandler(event);
                                    console.log();
                                }} type="file" id="disk__upload-input" className="disk__upload-input"/>
                            </div>
                        </div>
                        </div>


                        <div className="rightBlock">

                            <div className="info-rb">
                                <div className="name form-inpt">
                                    <label>как к вам обращаться (ФИО)</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={fio}
                                        onChange={(e) => setFio(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="name form-inpt">
                                    <label>адресс</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={adress}
                                        onChange={(e) => setAdress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="name form-inpt">
                                    <label>телефон</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Type form-inpt">
                                    <label>Тип</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Mark form-inpt">
                                    <label>Марка</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={mark}
                                        onChange={(e) => setMark(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Mark form-inpt">
                                    <label>удобное время для прибытия</label>
                                    <input
                                        id={'dateTimeInput'}
                                        type="datetime-local"
                                        className="input"
                                        value={time.toString()}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Mark form-inpt">
                                    <label>Время эксплуатации оборудывания</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={timeInUse}
                                        onChange={(e) => setTimeInUse(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="fullDescription form-inpt">
                                    <label>Комментарий</label>
                                    <textarea
                                        type="text"
                                        className="input"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="Save-btn">
                                    <a>
                                    <button className={"btnSave"}
                                            onClick={() => redactOrder(id,adress, fio, phone, type, mark, timeInUse, comment, urgency, new Date(time).toISOString(), imgs)}>Сохранить
                                    </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        



                    </form>
                </div> : <div className={"loading"}/>
            }
        </div>

    )}
export {Order}