import React from "react";
import { Card } from "antd";
import Config from "../../database";

const Products = (props) => {
  const onUpdate = () => {
    props.onUpdate(props.index);
  };
  const onDelete = () => {
    props.onDelete(props.id, props.imgUrl);
  };
  return (
    <Card style={{ width: 210, margin: 10 }}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col h-60">
          <img className="rounded-md h-44" src={props.img} />
          <div className="mt-5 mb-6 text-center">{props.name}</div>
        </div>
        <div className=" font-bold text-center">{props.price}</div>
        {props.id && (
          <div className="flex mt-6 space-x-4">
            <img
              className="cursor-pointer"
              onClick={onUpdate}
              src={require("../../assets/images/icons8-edit-24.png")}
            />
            <img
              className="cursor-pointer"
              onClick={onDelete}
              src={require("../../assets/images/icons8-remove-24.png")}
            />
          </div>
        )}
      </div>
    </Card>
  );
};
export default Products;
