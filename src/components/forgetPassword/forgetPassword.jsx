import { useFormik } from 'formik'
import React from 'react'

export default function ForgetPassword() {
  function SendCode (values)
  {
    console.log(values)
  }
  let Formik = useFormik({
    initialValues : {
      email : ''
    },
    onSubmit :SendCode 
  })
  return (
    <div>
      <h3>Forgot Password :</h3>
      <form onSubmit={Formik.handleSubmit} className='w-75 mx-auto my-5'>
        <label>E-mail:</label>
        <input type='email' id='email' name='email'value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='form-control'/>
        <button className='btn text-light my-3' style={{ backgroundColor: "#0aad0a" }}>Send Code ...</button>
      </form>
    </div>
  )
}
