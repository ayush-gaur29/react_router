import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Donors from './components/Donors/Donors.jsx'
import Finddonor from './components/Finddonor/Finddonor.jsx'
import DonatedBlood from './components/DonatedBlood/DonatedBlood.jsx'
import Login from "./components/Auth/Login.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Signup from "./components/Auth/Signup.jsx";
//import Profile from "./components/Profile/Profile.jsx"


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="donatedblood"element={<DonatedBlood />}/>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* 🔐 Protected Routes */}

      <Route
       path="contact"
        element={
        <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } 
        />

      <Route
        path="donors"
        element={
          <ProtectedRoute>
            <Donors />
          </ProtectedRoute>
        }
      />

      <Route
        path="finddonor"
        element={
          <ProtectedRoute>
            <Finddonor />
          </ProtectedRoute>
        }
      />
    </Route>

  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
