import React, { useEffect, useState, useContext } from "react";
import storage from "../../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import ImageUploader from "react-images-upload";
import { useNavigate } from "react-router-dom";
import Config from "../../database";
import { v4 } from "uuid";
import { Form, Input, Select } from "antd";
import { AuthContext } from "../../context/AuthContext";

const { Option } = Select;
let img;
const AddItem = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "image/");
  console.log(currentUser.uid);
  const uploadImage = () => {
    if (imageUpload === null) return;
    img = imageUpload.name + v4();
    const imageRef = ref(storage, `image/${img}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => alert("Added your product on site!"))
      .then(() => navigate("/"));
  };
  const onFinish = (e) => {
    uploadImage();
    e.user = currentUser.uid;
    e.image = img;
    Config.post("/advertises.json", e);

    console.log(e);
    console.log(imageUpload);
  };
  const onChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((items) => {
        getDownloadURL(items).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <div>
      {" "}
      <div className=" text-center font-bold pt-32 text-3xl">Add product</div>
      <div className="flex max-w-6xl mx-auto">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="">
            <ImageUploader
              singleImage={true}
              buttonText="Insert an image"
              style={{
                width: 450,
                height: 300,
              }}
              withPreview={true}
              onChange={(e) => setImageUpload(e[0])}
            />
          </div>
        </div>
        <div className="w-1/2 py-16 mt-10 px-12 max-w-xl mx-auto">
          <Form onFinish={onFinish} className="flex flex-col space-y-1 ">
            <label className="font-bold text-black">Title</label>
            <Form.Item name={"name"}>
              <Input />
            </Form.Item>
            <label className="font-bold">Category</label>
            <Form.Item name={"category"}>
              <Select defaultValue="Сонгох" onChange={onChange}>
                <Option value="books">Science Fiction</Option>
                <Option value="academicDress">Adventure</Option>
                <Option value="electronic">History</Option>
              </Select>
            </Form.Item>

            <label className="font-bold">Price</label>
            <Form.Item name={"price"}>
              <Input />
            </Form.Item>

            <label className="font-bold">Phone</label>
            <Form.Item name={"phone"} required={true}>
              <Input />
            </Form.Item>

            <label className="font-bold">Description</label>
            <Form.Item name={"about"}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <button
                htmltype="submit"
                className="bg-[#E28025] px-7 py-1 rounded-lg text-white mt-5 "
              >
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AddItem;
