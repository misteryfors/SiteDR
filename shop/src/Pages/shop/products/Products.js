import React from 'react'
import {NavLink} from "react-router-dom";
import '../../../components/css/fix.css'
import {useState, useEffect} from 'react'
import { initWow } from '../../../wow/wow';


const Products=({product})=>{
    useEffect(() => {
        initWow();
      }, []);
    let img;
    if (product.imgs.length!=0)
    {
        img=<img src={"https://master43.ru:8443/products/"+product._id+"/"+product.imgs[0]}/>
    }
        return(
            <div className="ProductsSlot wow animate__animated animate__fadeIn">


                    <div className="product-wrapper">
                        <div className={"product"}>
                            <NavLink to={"item/"+product._id} style={{textDecoration:'none'}}>
                                <div className='Item-Content'>
                                        <div className="imageBox">
                                            {img}
                                        </div>
                                        <div className={'name'}>{product.name}</div>
                                        <hr></hr>
                                        <div className={'price'}>{product.price}₽</div>
                                        <div className={'short'}><p>{product.shortDescription}</p></div>
                                        {/*<button className='Buy_btn'>Заказать</button>*/}
                                </div>
                            </NavLink>
                        </div>
                    </div>


            </div>
        )
}
export default Products