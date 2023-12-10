import { async } from "@firebase/util";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Config from "../../database";

function ProductDetail(props) {
  const location = useLocation();
  const [data, setData] = useState({});
  const params = useParams();
  const id = params.id;
  console.log(location);
  useEffect(async () => {
    window.scrollTo(0, 0);
    const res = await Config.get(`/advertises.json`);
    const temp = res.data;
    setData(temp[id]);
  }, []);
  return (
    <div className="max-w-5xl mx-auto pt-32">
      <h1 className="uppercase shadow-md text-center">{data?.name}</h1>
      <h1 className="mt-5"><img className="inline h-5" src={require(`../../assets/images/icons8-price-tag-usd-24.png`)}/>  Price: {data?.price}</h1>
      <div className=""><img className="inline h-5" src={require(`../../assets/images/icons8-phone-24.png`)}/>  Phone number: {data?.phone}</div>
      <div className="mt-3 mb-3 border-t-2"><h1 className="mt-2">Description:</h1>{data?.about}</div>
      <img src={location.state?.imgUrl} />

    </div>
    
  );
}

export default ProductDetail;
