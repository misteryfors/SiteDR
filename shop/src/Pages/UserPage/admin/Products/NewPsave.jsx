import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../../components/MicroComponents/input/Input";
import FilesUploadComponent from "../../../../components/files-upload-component";
import {createProduct, redactProduct} from "../../../../actions/product";
import {useState} from 'react';
import {uploadFile} from "../../../../actions/product";
import '../../../../components/css/shablon.css'
import tovar from "../../../../components/image/tovar.jpg";

export default function NewProduct(){
const [name, setName] = useState("")
const [type, setType] = useState("")
const [mark, setMark] = useState("")
const [img, setImg] = useState("")
const [price, setPrice] = useState("")
const [shortDescription, setShortDescription] = useState("")
const [description, setDescription] = useState("")
const UID = useSelector(state =>state.product.UID)
const dispatch = useDispatch()
const currentDir = useSelector(state => state.files.currentDir)
const dirStack = useSelector(state => state.files.dirStack)
useEffect(() => {
//if (!UID)
//dispatch(createProduct(name, type, mark, img, price, shortDescription, description, false))
}, [])

//function showPopupHandler() {
//     dispatch(setPopupDisplay('flex'))
//}

//function backClickHandler() {
//    const backDirId = dirStack.pop()
//    dispatch(setCurrentDir(backDirId))
//}

function fileUploadHandler(event) {
const files = [...event.target.files]
files.forEach(file => uploadFile(file,'', UID))
}
console.log(useParams())
return(
<div>
<div className={"product-card"}>
<img src={tovar} className={"product-img"}/>
<h3 className={"product-name"}>Product Name</h3>
<p className={"product-type"}>Type: <span>Electronics</span></p>
<p className={"product-mark"}>Mark: <span>Brand</span></p>
<p className={"product-price"}>Price: <span>$100</span></p>
<p className={"product-description"}>This is a description of the product. It can be quite long and
                                    give more information about the product.</p>
<p className={"product-short-description"}>This is a short description of the product. It gives a
                                          brief overview of the product.</p>
<div className={"product-buttons"}>
<button className={"add-to-cart-btn"}>Add to Cart</button>
<button className={"more-info-btn"}>More Info</button>
</div>
</div>
<Input value={name} setValue={setName} type="text" placeholder="Введите название..."/>
            <Input value={type} setValue={setType} type="text" placeholder="Введите тип..."/>
            <Input value={mark} setValue={setMark} type="text" placeholder="Введите марку..."/>
            <Input value={img} setValue={setImg} type="text" placeholder="Введите фото..."/>
            <div className="disk__upload">
                <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
            </div>
            <Input value={price} setValue={setPrice} type="text" placeholder="Введите цену..."/>
            <Input value={shortDescription} setValue={setShortDescription} type="text" placeholder="Введите короткое описание..."/>
            <Input value={description} setValue={setDescription} type="text" placeholder="Введите описание..."/>
            <button onClick={() => createProduct(name, type, mark, img, price, shortDescription, description, false)}>Создать</button>
            <button onClick={() => redactProduct(UID, name, type, mark, img, price, shortDescription, description, true)}>Сохранить</button>
        </div>
)
}
export {NewProduct};