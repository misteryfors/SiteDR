import React, {useEffect} from 'react'
import {Route, Routes, Navigate} from "react-router-dom";
import {Layout} from "./Pages/layout/Layout";
import {InfoPage} from "./Pages/info/info";
import {MainPage} from "./Pages/shop/main";
import {CPProfile} from "./Pages/UserPage/CPProfile";
import {CPChats} from "./Pages/UserPage/admin/Chats/CPChats"
import {NewProduct} from "./Pages/UserPage/admin/Products/NewProduct"
import {LoginPage} from "./Pages/auntification/Login";
import {RegistrationPage} from "./Pages/auntification/Registration";
import {ClientPage} from "./Pages/UserPage/client/ClientPage";
import {AdminPage} from "./Pages/UserPage/admin/AdminPage";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./actions/user";
import {CPProducts} from "./Pages/UserPage/admin/Products/CPProducts";
import ProductPage from "./Pages/shop/products/productPage";
import {NewOrder} from "./Pages/order/newOrder";
import {Order} from "./Pages/order/order";
import {Slider} from "./Pages/slider";
import CPOrders from "./Pages/UserPage/admin/Orders/CPOrders";
import {Helmet} from "react-helmet";
import {MoreInfoPage} from "./Pages/moreInfo/moreInfo";

export default function Routs(){
    const isAuth =useSelector(state =>state.user.isAuth)
    const role =useSelector(state =>state.user.currentUser.role)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    return(
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="fer" element={<Slider/>}/>
                <Route index element={<InfoPage/>}/>
                <Route path="info" element={<MoreInfoPage/>}/>
                <Route path="shop" element={<MainPage/>}/>
                <Route path="shop" element={<MainPage/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="*" element={<MainPage/>}/>

                </Route>
                <Route path="shop/item/:id" element={<ProductPage/>}/>
                {!isAuth && <Route path="/User" element={<Navigate to="/login" />}/>}
                {isAuth && <Route path="registration" element={<Navigate to="/User"/>}/>}
                {isAuth && <Route path="login" element={<Navigate to="/User"/>}/>}
                {role==="admin" ?
                    <Route path="/User" element={<AdminPage/>}>
                        <Route path="profile" element={<CPProfile/>}/>
                        <Route path="chats" element={<CPChats/>}/>
                        <Route path="products" element={<CPProducts/>}/>
                        <Route path="orders" element={<CPOrders/>}/>
                    </Route>
                    :
                    <Route path="/User" element={<ClientPage/>}>
                        <Route path="profile" element={<CPProfile/>}/>
                        <Route path="chats" element={<CPChats/>}/>
                        <Route path="products" element={<CPProducts/>}/>
                    </Route>
                }
                <Route path="Order/:id" element={<Order/>}/>
                <Route path="NewOrder" element={<NewOrder/>}/>
                <Route path="redact/item/:id" element={<NewProduct/>}/>
                <Route path="NewProduct" element={<NewProduct/>}/>
                <Route path="registration" element={<RegistrationPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="*" element={<InfoPage/>}/>
            </Route>
        </Routes>
    )
}