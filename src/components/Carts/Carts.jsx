import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import { Link } from 'react-router-dom';
import CheckOut from '../checkOut/checkOut';

export default function Carts() {
  const [data ,setData]  = useState([]);
  const [price ,setPrice]  = useState([]);

  let {getCart ,UpdateCart , DeleteCart ,setCartNumber } = useContext(cartContext);
  useEffect (()=>{
    (async()=>{
      let {data} = await getCart(`https://ecommerce.routemisr.com/api/v1/cart`);
      setData(data.data.products)
      setPrice(data.data.totalCartPrice)
    })()
  },[])

  async function removeProduct (id)
  {
   let {data} = await DeleteCart(id);
    setData(data.data.products)
    setPrice(data.data.totalCartPrice)
    setCartNumber(data.numOfCartItems);
  }
  async function UpdateProduct (id , count)
  {
    if (count == 0 )
    {
      DeleteCart(id)
    }
    else 
    {
      let {data} = await UpdateCart(id , count);
      setData(data.data.products)
      setPrice(data.data.totalCartPrice)
      setCartNumber(data.numOfCartItems);
    }
   
  }
  return (
    <div className='container'>
      <h2>Shopping Cart</h2>
    <Link to="/checkOut" className='text-end'>
        <button className='btn text-light' style={{ backgroundColor: "#0aad0a" }} >Online Payment</button>
      </Link>
      <div className="row">
        <div className="col-md-11 shadow p-5 m-auto my-5" style={{backgroundColor: '#f0f4f3'}}>
          <h3> <span className='fw-bold' style={{ color: "#0aad0a" }} >Total Price :</span> {price}</h3>
          {
            data.map ((product)=>{
              return <>
              {/* {
                product.count !== 0 ?  */}
                 <div className="row border-bottom py-5" key={product._id}>
                <div className="col-md-1">
                  <img src={product.product.imageCover} alt='cover' className='w-100'/>
                </div>
                <div className="col-md-11 d-flex justify-content-between align-items-center">
                  <div >
                  <h5>{product.product.title}</h5>
                  <p>{product.price}</p>
                  <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can'></i> Remove</button>
                    </div>
                    <div >
                <button onClick={()=> {UpdateProduct(product.product._id , product.count+1)}} className='btn btn-outline-success'> + </button>
                <span className='mx-2'>{product.count}</span>
                <button onClick={()=> {UpdateProduct(product.product._id , product.count-1)}} className='btn btn-outline-success'>  - </button>

                  </div>
               
                </div>
                
              </div>
              {/* // : ''
              // } */}
              </>
             
            })
          }
        </div>
      </div>
    </div>
  )
}
