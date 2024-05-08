import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import Carts from "./components/Carts/Carts";
import CounterContextProvider from "./Context/counter";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Details from "./components/Details/Details";
import CartContextProvider from "./Context/cartContext";
import { ToastContainer, toast } from 'react-toastify';
import CheckOut from "./components/checkOut/checkOut";
import ForgetPassword from "./components/forgetPassword/forgetPassword";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <CheckOut/>
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Carts />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "details/:id",
        element: (
          <ProtectedRoute>
            <Details />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "forgetPassword",
        element: (
            <ForgetPassword/>
        ),
      },
      { path: "*", element: <NotFound /> },

    ],
  },
]);
function App() {
  return (
    <TokenContextProvider>
      <CartContextProvider>
        {/* <CounterContextProvider> */}
        <RouterProvider router={router}></RouterProvider>
        {/* <ToastContainer theme="colored"/> */}
        <ToastContainer />

        {/* </CounterContextProvider> */}
      </CartContextProvider>
    </TokenContextProvider>
  );
}

export default App;
