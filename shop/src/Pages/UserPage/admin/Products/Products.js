import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../../../../components/css/shortProduct.css'
import plug from "../../../../components/image/Заглушка.png";
import {deleteProduct} from "../../../../actions/product";
import UniversalModal from '../../../../components/universalModal';
import {useState} from 'react';

const Products=({product,setProducts,products})=>{
    const [modalActive, setModalActive] = useState("")
    let img;
    if (product)
    {img=<img src={plug}/>
    if (product.imgs.length!=0)
    {
        img=<img src={"https://master43.ru:8443/products/"+product._id+"/"+product.imgs[0]}/>
    }else {

    }
    }
    const dispatch = useDispatch()
        return(
            <div className="ShortProductsSlot" style={{display:"flex"}}>

                    <UniversalModal
                        active={modalActive} setActive={setModalActive}
                        trueBtn={'Да'} falseBtn={'Нет'}
                        trueFunction={() => deleteProduct(product._id,setProducts,products)} falseFunction={()=>setModalActive(false)}
                        trueLink={''} falseLink={''}
                        message={'Вы действительно хотите удалить товар?'}/>
                        
                    <div className="product-wrapper">
                        <div className={"Short-product"}>


                                    <div className='Products-short-allign-item'>
                                        <div className="imageBox">
                                                {img}
                                            </div>
                                            <div className={'name-desc'}>Имя:<b> {product.name ? product.name : 'БезИмени'}</b></div>
                                            <div className={'price-desc'}>Цена:<br></br> <p><b>{product.price ? product.price: 0}₽</b></p></div>
                                            <div className={'short-desc'}><p>Описание: {product.shortDescription}</p></div>
                                            
                                            <div className='buttons_redact_delete'>

                                            

                                                <button className={'btn-delete'} onClick={()=>setModalActive(true)}>Удалить</button>
                                                <NavLink to={"../../redact/item/"+product._id} >
                                                    <button className={'btn-redact'} >Изменить</button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                        </div>


                    </div>
        )
}
export default Products