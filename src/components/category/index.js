import React from "react";
import { Card } from "antd";

const Category = (props) => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center rounded-md p-4">
        <div className="h-[250px] flex justify-center items-center">
          <img
            className="w-72 "
            src={require(`../../assets/images/${props.img}.png`)}
          />
        </div>
        <div className="font-bold text-xl">{props.name}</div>
      </div>
    </Card>
  );
};
export default Category;
