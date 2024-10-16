import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/cartContext';

export default function CheckOut() {
    
    const [cartId , setCartId] = useState('')
  let { CheckOut ,getCart } = useContext(cartContext);
  useEffect(()=>{
    (async()=>{
      let {data} = await getCart(`https://ecommerce.routemisr.com/api/v1/cart`);
      setCartId(data.data._id)
    })()
  },[])
  async function payment(values )  {
    let data = await CheckOut(cartId , values)
    console.log(data.data)
    if (data.data.status == 'success')
    {
      console.log('hi')
      window.location = data.data.session.url
    }
  }
  const formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    onSubmit: payment
  });

  return (
    <div className="my-5">
      <h1 style={{ color: "#88B04B" }} className="text-center">Payment Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row ">
          <div className="col-md-8 m-auto w-50 shadow p-4 bg-light">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="userdetails">Details:</label>
                <input
                  type="text"
                  id="userdetails"
                  name="details"
                  onChange={formik.handleChange}
                  value={formik.values.details}
                  className={`form-control ${formik.touched.details && formik.errors.details ? 'is-invalid' : ''}`}
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="userCity">City:</label>
                <input
                  type="text"
                  id="userCity"
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                />
              </div>
              
              <div className="col-md-12">
                <label htmlFor="userPhone">Phone:</label>
                <input
                  type="tel"
                  id="userPhone"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                />
              </div>

              <div className="col-md-12 text-end my-2">
                <button
                  type="submit"
                  style={{ backgroundColor: "#0aad0a", color: "white" }}
                  className="btn"
                >
                  Submit Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
