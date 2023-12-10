import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "../../components/products";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import storage from "../../firebase";
import Config from "../../database";
import { v4 } from "uuid";

const Home = (props) => {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "image/");
  const [advertises, setAdvertises] = useState([]);
  console.log(imageList.filter((e) => e.includes("obj.jpg")));

  const fetchAds = async () => {
    const res = await Config.get("/advertises.json");
    let fetchedAds = [];
    for (let key in res.data) {
      fetchedAds.push({ ...res.data[key] });
    }
    setAdvertises(fetchedAds);
  };
  const fetchImg = async () => {
    const res = await listAll(imageListRef);
    res.items.map(async (e) => {
      const url = await getDownloadURL(e);
      setImageList((prev) => [...prev, url]);
    });
  };
  useEffect(() => {
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
  const helper = (arr, n) => {
    let bool;
    arr.map((e) => {
      if (e.category == n) {
        bool = true;
      }
    });
    if (bool) return true;
    else return false;
  };
  let comp;
  if (props.catVal == "all") {
    comp = (
      <>
        {helper(advertises, "books") ? (
          <>
            {" "}
            <h1 className="mt-24 ml-4 text-xl">Science Fiction</h1>
            <div className=" flex flex-wrap ">
              {advertises?.map((e) =>
                e.category == "books" ? (
                  <Link
                    to={`/productDetail/${e.id}`}
                    state={{
                      imgUrl: imageList.filter((el) => el.includes(e.image))[0],
                    }}
                  >
                    <Products
                      key={e.category + v4()}
                      name={e.name}
                      img={imageList.filter((el) => el.includes(e.image))[0]}
                      price={e.price}
                    />
                  </Link>
                ) : null
              )}
            </div>
          </>
        ) : null}
        {helper(advertises, "academicDress") ? (
          <>
            {" "}
            <h1 className="mt-4 ml-4 text-xl">Adventure</h1>
            <div className=" flex flex-wrap ">
              {advertises?.map((e) =>
                e.category == "academicDress" ? (
                  <>
                    {console.log(
                      imageList.filter((el) => el.includes(e.image))
                    )}
                    <Link
                      to={`/productDetail/${e.id}`}
                      state={{
                        imgUrl: imageList.filter((el) =>
                          el.includes(e.image)
                        )[0],
                      }}
                    >
                      <Products
                        key={e.category + v4()}
                        name={e.name}
                        img={imageList.filter((el) => el.includes(e.image))[0]}
                        price={e.price}
                      />
                    </Link>
                  </>
                ) : null
              )}
            </div>
          </>
        ) : null}
        {helper(advertises, "electronic") ? (
          <>
            {" "}
            <h1 className="mt-4 ml-4 text-xl">History</h1>
            <div className=" flex flex-wrap ">
              {advertises?.map((e) =>
                e.category == "electronic" ? (
                  <Link
                    to={`/productDetail/${e.id}`}
                    state={{
                      imgUrl: imageList.filter((el) => el.includes(e.image))[0],
                    }}
                  >
                    <Products
                      key={e.category + v4()}
                      name={e.name}
                      img={imageList.filter((el) => el.includes(e.image))[0]}
                      price={e.price}
                    />
                  </Link>
                ) : null
              )}
            </div>
          </>
        ) : null}
      </>
    );
  } else if (props.catVal == "books" && helper(advertises, "books")) {
    comp = (
      <>
        {" "}
        <h1 className="mt-24 ml-4 text-xl">Science Fiction</h1>
        <div className=" flex flex-wrap ">
          {advertises?.map((e) =>
            e.category == "books" ? (
              <Link
                to={`/productDetail/${e.id}`}
                state={{
                  imgUrl: imageList.filter((el) => el.includes(e.image))[0],
                }}
              >
                <Products
                  key={e.category + v4()}
                  name={e.name}
                  img={imageList.filter((el) => el.includes(e.image))[0]}
                  price={e.price}
                />
              </Link>
            ) : null
          )}
        </div>
      </>
    );
  } else if (
    props.catVal == "academicDress" &&
    helper(advertises, "academicDress")
  ) {
    comp = (
      <>
        <h1 className="mt-4 ml-4 text-xl">Adventure</h1>
        <div className=" flex flex-wrap ">
          {advertises?.map((e) =>
            e.category == "academicDress" ? (
              <Link
                to={`/productDetail/${e.id}`}
                state={{
                  imgUrl: imageList.filter((el) => el.includes(e.image))[0],
                }}
              >
                <Products
                  key={e.category + v4()}
                  name={e.name}
                  img={imageList.filter((el) => el.includes(e.image))[0]}
                  price={e.price}
                />
              </Link>
            ) : null
          )}
        </div>
      </>
    );
  } else if (props.catVal == "electronic" && helper(advertises, "electronic")) {
    comp = (
      <>
        <h1 className="mt-4 ml-4 text-xl">History</h1>
        <div className=" flex flex-wrap ">
          {advertises?.map((e) =>
            e.category == "electronic" ? (
              <Link
                to={`/productDetail/${e.id}`}
                state={{
                  imgUrl: imageList.filter((el) => el.includes(e.image))[0],
                }}
              >
                <Products
                  key={e.category + v4()}
                  name={e.name}
                  img={imageList.filter((el) => el.includes(e.image))[0]}
                  price={e.price}
                />
              </Link>
            ) : null
          )}
        </div>
      </>
    );
  }
  return (
    <div className="bg-white">
      <div>
        <img
          className="opacity-50 backdrop-blur-sm w-screen h-5/6"
          src={require(`../../assets/images/bool.jpg`)}
        />
        <h2 className="2xl:h-25 xl:h-22 lg:h-16 md:h-10 sm:h-6 absolute 2xl:text-4xl xl:text-3xl lg:text-xl md:text-sm sm:text-xs text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Welcome to Book Selling Platform! You can sell or buy books with this
          website...
        </h2>
      </div>
      <div className="max-w-6xl mx-auto">{comp}</div>
    </div>
  );
};

export default Home;
