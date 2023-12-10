import React from "react";
import { Select, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const Header = (props) => {
  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
    console.log("logout");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <div className="mx-2 my-2">
          <div>{props.user}</div>
          <div
            onClick={logOut}
            className="flex items-center justify-center bg-slate-500 rounded-2xl mt-3"
          >
            <div>Log out</div>
            <div className="ml-1 mb-1">
              <LogoutOutlined />
            </div>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="fixed bg-white text-black flex  items-center w-full  h-24 shadow-xl z-10">
      <div className="ml-14 flex items-center">
        <Link to="/">
          <img
            className="xl:h-10 lg:h-8 md:h-6 sm:h-4"
            src={require(`../../assets/images/logoBook.jpg`)}
          />
        </Link>
        <Link to="/">
          <div className="xl:text-lg lg:text-sm md:text-sm sm:text-xs ml-2 font-bold text-black">
            Book Worms
          </div>
        </Link>
      </div>

      <div className="xl:ml-10 lg:ml-6 md:ml-2 xl:w-60 lg:w-32 md:w-20 sm:w-10}}">
        <Select
          style={{ width: 125 }}
          defaultValue="All"
          onChange={props.onChange}
        >
          <Option value="books">Science Fiction</Option>
          <Option value="academicDress">Adventure</Option>
          <Option value="electronic">History</Option>
          <Option value="all">All</Option>
        </Select>
      </div>

      <div className="xl:w-550 lg:w-300 md:w-160 sm:w-100 flex items-center ml-12">
        <input
          className=" text-black xl:px-10 lg:px-5 md:px-2 sm:px-0 py-[6px] border-2 border-slate-200 rounded-full focus:outline-line"
          type={"text"}
          placeholder="Search . . ."
        />
        <div className=" ml-2 text-[#5F5F5F]">
          <SearchOutlined />
        </div>
      </div>
      <div className="xl:ml-52 lg:ml-30 md:ml-16 sm:ml-6 flex items-center space-x-3">
        <Link to={"/addItem"}>
          <button className=" bg-[#339CCC] flex items-center py-[5px] px-5 rounded-full space-x-2">
            <div className="text-xl">
              <img
                src={require("../../assets/images/icons8-plus-math-24.png")}
              />
            </div>

            <div className=" text-white">Add product</div>
          </button>
        </Link>
        <Link to={"/myProducts"}>
          <button className=" bg-[#339CCC] flex items-center py-[5px] px-5 rounded-full space-x-2">
            <div className="text-xl">
              <img
                src={require("../../assets/images/icons8-shopping-cart-24.png")}
              />
            </div>
            <div className=" text-white">My Products</div>
          </button>
        </Link>
      </div>
      <div className=" bg-[#339CCC] xl:ml-32 md:ml-16 sm:ml-8 xs:ml-2 py-2 px-2 text-2xl rounded-full flex items-center">
        <Dropdown overlay={menu} trigger={["click"]}>
          <UserOutlined style={{ color: "white" }} />
        </Dropdown>
      </div>
    </div>
  );
};
export default Header;
