import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgetPassword() {
  let navigate = useNavigate()
  const [loading, setloading] = useState(false);

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is Reqired").email("Enter Valid Email"),
  });
  async function SendCode(values) {
    setloading(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values)
    console.log(data)
    if(data.statusMsg == 'success')
      {
        document.querySelector('.ForgotPassword').classList.add('d-none')
        document.querySelector('.verfiyCode').classList.remove('d-none')
      }
      setloading(false);
  }
  let Formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema:validationSchema ,
    onSubmit: SendCode,
  });
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Code is Reqired"),
  });
  async function SendData(values) {
    setloading(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values)
    console.log(data)
    if(data.status == 'Success')
      {
        navigate('/resetPassword')
      }
    setloading(false);

  }
  let verifyFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema:validationSchema2 ,
    onSubmit: SendData,
  });
  return (
    <>
    <div className="ForgotPassword">
      <h3>Forgot Password :</h3>
      <form onSubmit={Formik.handleSubmit} className="w-75 mx-auto my-5">
        <label>E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          className="form-control"
        />
        {
          Formik.errors.email && Formik.touched.email ? <p  className="text-danger my-3">{Formik.errors.email}</p> : ""
         }
        <button
          type="submit"
          className="btn text-light my-3"
          style={{ backgroundColor: "#88B04B" }}
          disabled = {!(Formik.dirty && Formik.isValid)}
        >
          Send Code
          {loading ? (
                    <span>
                      <li className="fa-solid text-light mx-2 fa-spinner fa-spin"></li>
                    </span>
                  ) : (
                    ""
                  )}
        </button>
      </form>
    </div>
    <div className="verfiyCode d-none">
      <h3>verfiy Code :</h3>
      <form onSubmit={verifyFormik.handleSubmit} className="w-75 mx-auto my-5">
        <label>Verfiy Code:</label>
        <input
          type="text"
          id="resetCode"
          name="resetCode"
          value={verifyFormik.values.resetCode}
          onChange={verifyFormik.handleChange}
          onBlur={verifyFormik.handleBlur}
          className="form-control"
        />
        {
          verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ? <p  className="text-danger my-3">{verifyFormik.errors.resetCode}</p> : ""
         }
        <button
          type="submit"
          className="btn text-light my-3"
          style={{ backgroundColor: "#88B04B" }}
          disabled = {!(verifyFormik.dirty && verifyFormik.isValid)}
        >
          Verfiy Code 
          {loading ? (
                    <span>
                      <li className="fa-solid text-light mx-2 fa-spinner fa-spin"></li>
                    </span>
                  ) : (
                    ""
                  )}
        </button>
      </form>
    </div>
    </>
  );
}
