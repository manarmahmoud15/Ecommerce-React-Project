import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();
export default function CartContextProvider(props) {
  const [cartNumber, setCartNumber] = useState(0);

  let BaseURL = `https://ecommerce.routemisr.com`;
  let headers = { token: localStorage.getItem("userToken") };
  function AddToCart(id) {
    return axios.post(
      `${BaseURL}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: headers,
      }
    );
  }
  function UpdateCart(id ,count) {
    return axios.put(
      `${BaseURL}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: headers,
      }
    );
  }
  function DeleteCart(id) {
    return axios.delete(
      `${BaseURL}/api/v1/cart/${id}`, 
      {
        headers: headers,
      }
    );
  }
  async function CheckOut(id , formdata)
  {
    return axios.post(
      `${BaseURL}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        shippingAddress : formdata
      } ,
      {
        headers: headers,
      }
    )
  }
  function getCart() {
    return axios.get(`${BaseURL}/api/v1/cart`, {
      headers: headers,
    });
  }

  return (
    <cartContext.Provider value={{ AddToCart, setCartNumber, cartNumber ,getCart ,UpdateCart , DeleteCart ,CheckOut }}>
      {props.children}
    </cartContext.Provider>
  );
}
