import React from "react";
import "./allorders.css";
import img from "../../assets/img/pay.jpg";
export default function Allorders() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card text-center">
        {/* <div style={{borderRadius : '200px' , height:'200px' , width:'200px' , background: '#F8FAF5' , margin:'0 auto'}}>
        <i class="checkmark">✓</i>

      </div> */}
        <img src={img} height={"350px"} width={"200px"} />
        <h1 style={{ color: "#88B04B"  ,fontWeight: '900' ,fontSize: '40px' , marginBottom: '10px' }}>Success</h1>
        <p style={{ color: "#404F5E", fontSize: "20px", margin: "0" }}>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
}
