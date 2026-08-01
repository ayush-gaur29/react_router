import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import { Outlet } from "react-router-dom";


function Layout () {
    return (
        <>
        
        <Header />
        <Outlet />
        <Footer />
        <ChatWidget />
        </>
    )
}

export default Layout