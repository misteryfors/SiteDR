import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../../../../components/css/shortProduct.css'
import plug from "../../../../components/image/Заглушка.png";
import {deleteOrder} from "../../../../actions/order";
import UniversalModal from '../../../../components/universalModal';
import {useState} from 'react';
import {baseServerUrl} from "../../../../globalSetings";

const Products=({product,setProducts,products})=>{
    const [modalActive, setModalActive] = useState("")
    let img;
    let user=product.user!=null?product.user:'undefined'
    if (product)
    {img=<img src={plug}/>
        if (product.imgs.length!=0)
        {
            img=<img src={baseServerUrl+"/products/"+user+"/"+product.imgs[0]}/>
        }else {

        }
    }
    const dispatch = useDispatch()
    return(
        <div className="ShortProductsSlot" style={{display:"flex"}}>

                        <UniversalModal
                            active={modalActive} setActive={setModalActive}
                            trueBtn={'Да'} falseBtn={'Нет'}
                            trueFunction={()=>deleteOrder(product._id,setProducts,products)} falseFunction={()=>setModalActive(false)}
                            trueLink={''} falseLink={''}
                            message={'Вы действительно хотите удалить заказ?'}/>

           
            <div className="product-wrapper">
                <div className={"Short-product"}>
                    <div className='Products-short-allign-item'>

                    <div className='Products-short-allign-item-flex'>
        

                        <div className="imageBox">
                            {img}
                        </div>

                        <div className='Products-short-allign-item-flex-info'>
                            <div className='status-desc'>
                            Статус:  {!product.chek ?
                                                            <span><p> Не просмотрено</p></span>
                                                            :
                                                            <span><p> Просмотрено</p></span>}
                            </div>
                            <div className={'name-desc adress'}>Адресс: <span>{product.adress ? product.adress : 'БезАдресса'}</span></div>
                            <div className={'price-desc'}>ФИО: <span>{product.fio ? product.fio: 'БезФИО'}</span></div>
                            <div className={'name-desc break-all'}>Id: <span>{product._id}</span></div>
                            <div className={'date-desc'}>Удобное время для прибытия:<span>{product.time.replace("Z", "").slice(0, -4).replace("T"," ")}</span></div>
                            <div className={'short-desc'}>Телефон: {product.phone ? product.phone: 'без телефона'}</div>
                        </div>
                        
                    </div>
                       
                       
                        <div className='buttons_redact_delete'>


                        

                            <button className={'btn-delete'} onClick={()=>setModalActive(true)}>Удалить</button>
                            
                            <NavLink to={'/Order/'+product._id}>
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