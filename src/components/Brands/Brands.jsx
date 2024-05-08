import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";

export default function Brands() {
  async function getBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, isLoading, isFetching  ,refetch} = useQuery("brands", getBrands, {
    cacheTime: 3000,
    staleTime: 3000,
    refetchInterval: 3000,
    refetchOnMount: false, // مش بيعمل رى فيتش اول ما بدخل ع الكومبوننت
    enabled : false  //مش هيعمل ريكوست غير لما اعمل ايفنت معين
  });
  // cachetime to remove data in caching , refetchinterval to refetch
  return (
    <div className="row">
      {!isLoading ? (
        <>
        <button onClick={()=>{refetch()}} className="btn bg-info text-light">reFetch</button>
          {data?.data.data.map((brand) => {
            return (
              <div className="col-md-3" key={brand._id}>
                <img className="w-100" src={brand.image} alt={brand.name} />
                <p>{brand.name}</p>
              </div>
            );
          })}
        </>
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
