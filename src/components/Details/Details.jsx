import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import { toast } from "react-toastify";

export default function Details() {
  let {AddToCart ,setCartNumber} = useContext(cartContext);

 

  const [prodectDetails, setProductDetails] = useState(null);
  let params = useParams();
  let ProductID = params.id;
  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${ProductID}`
    );
    setProductDetails(data.data);
  }
  useEffect(() => {
    getProduct();
  }, []);

  async function AddToMyCart (id){
    let {data} = await AddToCart(id);
    if (data.status == 'success')
    {
      toast(data.message);
      setCartNumber(data.numOfCartItems)
    }
  }
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <img src={prodectDetails?.imageCover} className="w-100" alt="cover" />
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around">
          <di>
            <h2>{prodectDetails?.title}</h2>
            <p>{prodectDetails?.description}</p>
          </di>
          <div>
            <p>{prodectDetails?.category.name}</p>
            <div>
            <p>
              <span style={{ color: "#0aad0a" }}> Price</span>
              {prodectDetails?.price}$
            </p>
            <p>
              {prodectDetails?.ratingsAverage} <i className="fa-solid fa-star" style={{ color: "#ffc500" }} ></i>
            </p>

            </div>
            
            <button
              onClick={()=> {AddToMyCart(prodectDetails._id)}}
              className="btn text-light"
              style={{ backgroundColor: "#0aad0a" }}
            >
              Add to card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
