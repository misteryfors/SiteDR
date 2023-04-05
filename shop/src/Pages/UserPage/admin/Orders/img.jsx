import React from 'react'
import {NavLink} from "react-router-dom";



const Img=({Img})=>{
    return(
        <div className="ProductsSlot">


            <div className="product-wrapper">
                <div className={"product"}>
                    <NavLink to={"item/"+product._id}>
                        <div style={{height: '90%'}}>
                            <div style={{height: '90%'}}>
                                <div className="imageBox">
                                    <img src={"https://master43.ru:8443/"+product._id+"/"+product.imgs[0]}/>
                                </div>
                                <div className={'name'}>{product.name}</div>
                                <div className={'price'}>{product.price}</div>
                                <div className={'short'}>{product.shortDescription}</div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>


        </div>
    )
}
export default Img