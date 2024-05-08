import React, { useContext } from "react";
import Products from "../Products/Products";
import Category from "../Category/Category";
import HomeSlider from "../HomeSlider/HomeSlider";
// import { counterContext } from "../../Context/counter";

export default function Home() {
  // let {counter , ChangeCounter} = useContext(counterContext);
  return (
    // <div>{counter}
    // <button onClick={()=> ChangeCounter()} className='btn btn-success'>Change Count</button>
    // </div>
    <>
    <HomeSlider/>
    <h2>Categories</h2>
    <Category/>
    <h2 className="my-3">Products</h2>
    <Products/>
    </>
  );
}
