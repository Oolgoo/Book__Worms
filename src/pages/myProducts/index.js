import React, { useContext } from "react";
import Products from "../../components/products";
import {
  getDownloadURL,
  listAll,
  ref,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { app } from "../../firebase";
import Config from "../../database";
import {
  get,
  getDatabase,
  ref as refer,
  remove,
  update,
} from "firebase/database";
import storage from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import ImageUploader from "react-images-upload";
import { Modal, Button, Form, Input, Select } from "antd";
import { v4 } from "uuid";

const { Option } = Select;
let img, category, name, phone, price, about;
function MyProducts() {
  const db = getDatabase(app);
  const [modalItem, setModalItem] = React.useState("");
  const [index, setIndex] = React.useState(null);
  const [myProduct, setMyProduct] = React.useState([]);
  const [imageUpload, setImageUpload] = React.useState(null);
  const { currentUser } = useContext(AuthContext);
  const [imageList, setImageList] = React.useState([]);
  const imageListRef = ref(storage, "image/");
  const [advertises, setAdvertises] = React.useState([]);
  const [cancel, setCancel] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [oldImgRef, setOldImg] = React.useState("");
  const [state, setState] = React.useState({
    image: "",
    category: "",
    name: "",
    price: "",
    phone: "",
    about: "",
  });
  const getInput = (e) => {
    switch (e.target.name) {
      case "name":
        name = e.target.value;
        break;
      case "price":
        price = e.target.value;
        break;
      case "phone":
        phone = e.target.value;
        break;
      case "about":
        about = e.target.value;
        break;
      default:
        return;
    }
  };
  console.log("first-->", state);
  // const imgChooser = () => {
  //   console.log("1----------------");
  //   img = imageUpload.name + v4();
  //   console.log(img);
  //   imageRef = ref(storage, `image/${img}`);
  //   console.log(imageRef);
  // };
  const uploadImage = () => {
    // let data = { ...state };
    // data.image = img;
    console.log("called");
    img = imageUpload.name + v4();
    const imageRef = ref(storage, `image/${img}`);
    setState({ ...state, image: img });
    if (imageUpload === null) return;

    uploadBytes(imageRef, imageUpload)
      .then(() => deleteObject(oldImgRef))
      .then(() => console.log("from upload"));
  };

  const onChange = (e) => {
    category = e;
  };
  const updateField = (e) => {
    setModalItem(e);
    setOpen(true);
  };
  const handleUpCancel = () => {
    setOpen(false);
  };
  const handleUpOk = () => {
    modalItem == "image" && setCancel(false);
    modalItem == "image" && imageUpload != null && uploadImage();
    modalItem == "image" && imageUpload != null && fetchImg();

    setOpen(false);

    name != null &&
      name.length != 0 &&
      setState({
        ...state,
        name,
      });
    about != null &&
      about.length != 0 &&
      setState({
        ...state,
        about,
      });
    phone != null &&
      phone.length != 0 &&
      setState({
        ...state,
        phone,
      });
    price != null &&
      price.length != 0 &&
      setState({
        ...state,
        price,
      });
    category != null &&
      category.length != 0 &&
      setState({
        ...state,
        category,
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    console.log("from save state ----> ", state);
    let tData = [...myProduct];
    tData[index] = state;
    update(refer(db, "/advertises/" + state.id), state)
      .then(() => alert("Updated!"))
      .then(() => setMyProduct(tData))
      .catch((err) => console.log(err))
      .finally(() => window.location.reload());
    setIsModalOpen(false);
  };
  console.log(oldImgRef);

  const onUpdate = (i) => {
    setIndex(i);
    setState({
      ...myProduct[i],
    });

    setIsModalOpen(true);
  };
  React.useEffect(() => {
    setOldImg(ref(storage, `image/${state.image}`));
  }, [state]);

  const onDelete = (e, imgUri) => {
    let tData = [...myProduct];
    const temp = tData.filter((el) => el.id != e);
    setMyProduct(temp);
    remove(refer(db, "/advertises/" + e))
      // .then(() => alert("Deleted"))
      .catch((err) => alert(err));
    deleteObject(ref(storage, "image/" + imgUri)).catch((err) =>
      console.log(err)
    );
  };

  const fetchImg = async () => {
    const res = await listAll(imageListRef);
    res.items.map(async (e) => {
      const url = await getDownloadURL(e);
      setImageList((prev) => [...prev, url]);
    });
  };

  React.useEffect(() => {
    advertises?.map((e) => {
      e.user == currentUser.uid && setMyProduct((pre) => [...pre, e]);
    });
  }, [advertises]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    Config.get("/advertises.json").then((res) => {
      const fetchedAds = [];
      for (let key in res.data) {
        fetchedAds.unshift({ ...res.data[key], id: key });
      }
      setAdvertises(fetchedAds);
    });
    fetchImg();
  }, []);

  let comp;
  switch (modalItem) {
    case "image":
      comp = (
        <div>
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
      );
      break;
    case "title":
      comp = (
        <div>
          <label className="ml-1 font-bold">Title</label>
          <Input onChange={getInput} name="name" />
        </div>
      );
      break;
    case "about":
      comp = (
        <div>
          <label className="ml-1 font-bold">Description</label>
          <Input.TextArea onChange={getInput} name="about" />
        </div>
      );
      break;
    case "phone":
      comp = (
        <div>
          <label className="ml-1 font-bold">Phone</label>
          <Input onChange={getInput} name="phone" />
        </div>
      );
      break;
    case "price":
      comp = (
        <div>
          <label className="ml-1 font-bold">Price</label>
          <Input onChange={getInput} name="price" />
        </div>
      );
      break;
    case "category":
      comp = (
        <div>
          <label className="ml-1 font-bold mr-2">Category</label>
          <Select
            style={{ width: 150 }}
            defaultValue="Сонгох"
            onChange={onChange}
          >
            <Option value="books">Science Fiction</Option>
            <Option value="academicDress">Adventure</Option>
            <Option value="electronic">History</Option>
          </Select>
        </div>
      );
      break;
  }

  return (
    <div className="max-w-7xl mx-auto pt-52">
      <h1 className="ml-4 text-xl">My Products</h1>
      <Modal
        bodyStyle={{ height: 500 }}
        title="Edit product"
        visible={isModalOpen}
        footer={[
          cancel && <Button onClick={handleCancel}>Cancel</Button>,
          <Button onClick={handleOk}>Save</Button>,
        ]}
        onCancel={cancel && handleCancel}
      >
        <div className="flex flex-col items-center ">
          <h1 className="font-bold">( CLICK THE FIELD TO EDIT )</h1>
          <div className="flex  flex-col h-60 space-y-6">
            <img
              onClick={() => updateField("image")}
              className="rounded-md h-44 cursor-pointer"
              src={imageList.filter((el) => el.includes(state.image))[0]}
            />
            <div
              className="cursor-pointer"
              onClick={() => updateField("category")}
            >
              <span className="font-bold">Category: </span>
              <span>{state.category.toUpperCase()}</span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => updateField("title")}
            >
              <span className="font-bold">Title: </span>
              <span className="text-base "> {state.name}</span>
            </div>
            <div
              className="w-72 cursor-pointer"
              onClick={() => updateField("about")}
            >
              <span className="font-bold">Description: </span>{" "}
              <span className="text-base ">{state.about}</span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => updateField("price")}
            >
              <span className="font-bold">Price: </span>{" "}
              <span className="text-base ">{state.price}</span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => updateField("phone")}
            >
              <span className="font-bold">Phone:</span>{" "}
              <span className="text-base ">{state.phone}</span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Edit product"
        visible={open}
        onCancel={handleUpCancel}
        onOk={handleUpOk}
      >
        {comp}
      </Modal>
      <div className="mt-25 flex flex-wrap">
        {myProduct?.map((e, i) => {
          return (
            <>
              <Products
                key={i}
                index={i}
                id={e.id}
                onUpdate={onUpdate}
                onDelete={onDelete}
                name={e.name}
                price={e.price}
                imgUrl={e.image}
                img={imageList.filter((el) => el.includes(e.image))[0]}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
export default MyProducts;
