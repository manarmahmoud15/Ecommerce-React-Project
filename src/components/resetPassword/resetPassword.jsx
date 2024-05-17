import axios from "axios";
import { Formik, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate()
  async function ResetPassword(values) {
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values)
    console.log(data)
    if(data.token)
      {
        navigate('/signin')
      }
  }
  let Formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: ResetPassword,
  });
  return (
    <div className="w-75 my-5 m-auto">
      <form onSubmit={Formik.handleSubmit}>
        <label>Email : </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onBlur={Formik.handleBlur}
          onChange={Formik.handleChange}
          value={Formik.values.email}
        ></input>
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          className="form-control"
          onBlur={Formik.handleBlur}
          onChange={Formik.handleChange}
          value={Formik.values.newPassword}
        ></input>
        <button
          type="submit"
          className="btn text-light my-3"
          style={{ backgroundColor: "#0aad0a" }}
          disabled={!(Formik.dirty && Formik.isValid)}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
