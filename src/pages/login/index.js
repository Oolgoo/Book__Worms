import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const { dispatch } = useContext(AuthContext);
  const onFinish = (e) => {
    const email = e.email;
    const password = e.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div
      className="flex h-screen bg-cover bg-local justify-center items-center"
      style={{
        backgroundImage: `url(${require(`../../assets/images/bool.jpg`)}) `,
      }}
    >
      <div className=" bg-white/30 backdrop-blur-sm max-w-7xl rounded-2xl py-10 px-5 grid grid-cols-5">
        <div className="col-span-2 flex flex-col items-center">
          <img
            className="h-14 rounded-3xl"
            src={require(`../../assets/images/logoBook.jpg`)}
            alt="gerLogo"
          />
          <Form className="w-full  px-3" layout="vertical" onFinish={onFinish}>
            <div className=" flex justify-start w-full ">
              <p className="text-3xl font-semibold text-white mt-2 flex text-left">
                Log in
              </p>
            </div>
            <Form.Item label="Email" name="email" required>
              <Input
                required
                name="email"
                type="email"
                placeHolder="Please input your email . . ."
                className="w-full"
              />
            </Form.Item>
            <Form.Item label="Password" name="password" required>
              <Input.Password
                required
                name="password"
                allowClear
                type="password"
                placeHolder="*******"
              />
            </Form.Item>
            {error && (
              <span className="flex justify-center text-red-600 font-semibold">
                Wrong email or password!
              </span>
            )}

            {/* <div className="flex justify-end  ">
              <a className="underline">Forget a password?</a>
            </div> */}
            <Button
              className="mt-4 w-32 rounded-xl"
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="mt-4 w-32 rounded-xl ml-60"
              type="primary"
            >
              Register
            </Button>
            <p className="text-2xl font-semibold mt-6 w-80 text-white">
              Platform designed for world wide book lovers.
            </p>
          </Form>
        </div>
        <div className="col-span-3 ml-10">
          <img
            alt="bgl"
            className="h-[500px]"
            src={require(`../../assets/images/seoultech1.jpg`)}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
