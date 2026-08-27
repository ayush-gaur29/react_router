import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import ScrollToTop from "./components/ScrollToTop";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";

function Layout() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
        <Header />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ToastProvider>
  );
}

export default Layout;