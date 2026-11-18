// import React, {useState} from "react";
// import Navbar from "./Navbar";
// import { Outlet, useLoaderData, useLocation } from "react-router-dom";
// import Footer from "./Footer";

// const Layout = () => {
//   const location = useLocation();
//   const [show, setShow] = useState(false);


//   const hideNavbar = 
//   location.pathname === "/admin-dashboard" ||
//   location.pathname === "/b2b-dashboard" ||
//   location.pathname ===  '/user-dashboard' || 
//   location.pathname === "/chatbot" || 
//   location.pathname === "/admin-login" || 
//   location.pathname === "/signup" || 
//   location.pathname === "/b2b-auth" || 
//   location.pathname === "/user-auth"



//   const hideFooter = location.pathname === '/admin-dashboard' ||
//   location.pathname === "/b2b-dashboard" || location.pathname === "/user-dashboard" ||
//   location.pathname === "/chatbot" ||
//   location.pathname === "/admin-login" || 
//   location.pathname === "/signup" || 
//   location.pathname === "/b2b-auth" || 
//   location.pathname === "/user-auth"


//   return (
//     <>
    
//       {!hideNavbar && <Navbar show={show} setShow={setShow}/> }
//       <Outlet />

//       {show && <Signup setShow={setShow} />}
      
//       {!hideFooter && <Footer />}
      
      
//     </>
//   );
// };

// export default Layout;


// mahima code //


import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Signup from "./Signup"; // Adjust path if needed

const DASHBOARD_ROUTES = [
  "/admin-dashboard",
  "/b2b-dashboard",
  "/user-dashboard",
  "/chatbot",
];

const AUTH_ROUTES = [
  "/admin-login",
  "/signup",
  "/b2b-auth",
  "/user-auth",
];

// Match exact routes and nested routes only
const matchesRoute = (pathname, route) =>
  pathname === route ||
  pathname.startsWith(`${route}/`);

export default function Layout() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  const isDashboardPage = DASHBOARD_ROUTES.some(
    (route) => matchesRoute(pathname, route)
  );

  const isAuthPage = AUTH_ROUTES.some(
    (route) => matchesRoute(pathname, route)
  );

  const hideNavbarAndFooter =
    isDashboardPage || isAuthPage;

  return (
    <div
      className={
        isDashboardPage
          ? "flex h-screen w-full flex-col overflow-hidden"
          : "flex min-h-screen w-full flex-col"
      }
    >
      {/* NAVBAR */}
      {!hideNavbarAndFooter && (
        <Navbar show={show} setShow={setShow} />
      )}

      {/* PAGE CONTENT */}
      <main
        className={
          isDashboardPage
            ? "min-h-0 w-full flex-1 overflow-y-auto"
            : "w-full flex-1"
        }
      >
        <Outlet />
      </main>

      {/* SIGNUP POPUP */}
      {show && <Signup setShow={setShow} />}

      {/* FOOTER */}
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
}
