import React, { useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, redactProduct} from "../../../../actions/product";
import {uploadFile} from "../../../../actions/product";
import "../../../../components/css/NewProd.css";
import '../../../../components/css/imgList.css'

const NewProduct = () => {
    const [mainImg, setMainImg] = useState("")
    const dispatch = useDispatch()
    let { id } = useParams();
    const [product, setProduct] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [ready, setReady] = useState(false)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [price, setPrice] = useState("")
    const [imgs, setImgs] = useState([])
    const [shortDescription, setShortDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")

    const [dragEnter, setDragEnter] = useState(false)


    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => {uploadFile(file, id, 'products');setProduct({...product,imgs:[...imgs, file.name]})})
        console.log(imgs)
        //setImgs(files[0].name)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("brand", mark);
        formData.append("price", price);
        formData.append("imgs", imgs);
        formData.append("shortDescription", shortDescription);
        formData.append("fullDescription", fullDescription);

    };
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
        files.forEach(file => {uploadFile(file, id, 'products');console.log(file.name);setImgs([...imgs, file.name]);})
        setDragEnter(false)
    }
    useEffect(() => {
        getProduct(id,setProduct,setFetching)
    }, [])
    useEffect(() => {
        if (product!=null)
        {
        setMainImg(product.imgs[0])
        setPrice(product.price)
        setName(product.name)
        setShortDescription(product.shortDescription)
        setFullDescription(product.description)
        setImgs(product.imgs)
        setMark(product.mark)
        setType(product.type)
        }
    }, [product])
    return (
        <div>
        {fetching==false?
                <div>
        <form className={"ProductForm"} onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className={"leftBlock"}>
                    <div className="imgSlot" style={{display: "block"}}>
                        {!dragEnter ?
                            <form onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                                  onDragOver={dragEnterHandler}>
                                <div className="mainImg">
                                    <img src={"https://master43.ru:8443/products/" + id + "/" + mainImg}/>
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

                                    <div className="deleteImage"></div>
                                    <img onMouseEnter={() => setMainImg(el)}
                                         src={"https://master43.ru:8443/products/" + id + "/" + el}/>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input type="text"
                               name={'uploader'}
                               className="form-control"
                               required multiple={true} onChange={(event) => {
                            fileUploadHandler(event);
                            console.log();
                        }} type="file" id="disk__upload-input" className="disk__upload-input"/>
                    </div>
                    <div className={"price"}>
                        <label>цена</label>
                        <input
                            type="text"
                            className="input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="rightBlock">
                    <div className="Name">
                        <label>Название</label>
                        <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="Type">
                        <label>Тип</label>
                        <input
                            type="text"
                            className="input"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="Mark">
                        <label>Марка</label>
                        <input
                            type="text"
                            className="input"
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                            required
                        />
                    </div>
                    <div className="shortDescription">
                        <label>короткое Описание</label>
                        <textarea
                            type="text"
                            className="input"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="fullDescription">
                        <label>полное Описание</label>
                        <textarea
                            type="text"
                            className="input"
                            value={fullDescription}
                            onChange={(e) => setFullDescription(e.target.value)}
                            required
                        />
                    </div>

                    <button className={"btnSave"}
                            onClick={() => {redactProduct(id, name, type, mark, imgs, price, shortDescription, fullDescription, true)}}>Сохранить
                    </button>
                </div>
            }



        </form>
                </div> : <div className={"loading"}/>}
            }
        </div>

    )}
export {NewProduct}