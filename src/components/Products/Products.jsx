import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import { ToastContainer, toast } from 'react-toastify';

export default function Products() {
  let {AddToCart ,setCartNumber} = useContext(cartContext);
  const [productList, setProductList] = useState([]);
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProductList(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);

  async function AddToMyCart (id)
  {
    let {data} = await AddToCart(id);
    if (data.status == 'success')
    {
      toast(data.message);
      setCartNumber(data.numOfCartItems);
    }
  }
  return (
    <div className="row my-5">
      {productList.length > 0 ? (
        <div className="row my-5">
          {productList.map((product) => (
            <div className="col-md-3" key={product._id}>
              <div className="product p-5">
                <Link to={`/details/${product._id}`} className="nav-link">
                <img
                  src={product.imageCover}
                  className="w-100"
                  alt={product.title}
                />
                <p style={{ color: "#0aad0a" }}>{product.category.name}</p>
                <h6>{product.title}</h6>
                <div className="d-flex justify-content-between">
                  <p>{product.price} EGP</p>
                  <p>
                    {product.ratingsAverage}
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#ffc500" }}
                    ></i>
                  </p>
                </div>
                </Link>
                <button
                  onClick={()=> {AddToMyCart(product._id)}}
                  className="btn justify-content-center align-items-center text-light"
                  style={{ backgroundColor: "#0aad0a" }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">         
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
          
        </div>
      )}
    </div>
  );
}
