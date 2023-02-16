import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { user, login } = useContext(AuthContext);

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const res = await login(email, password);
    if (res?.error || res?.data) {
      if (res?.data && res?.data.detail) {
        setError(res?.data?.detail);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="relative flex flex-col justify-center mt-32 overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1
          style={{ fontFamily: "Awesome" }}
          className="text-9xl font-semibold text-center text-purple-700"
        >
          Đăng nhập
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Quên mật khẩu?
          </a>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {/* <a href="#" className="font-medium text-purple-600 hover:underline">
            Đăng ký
          </a> */}
          <Link to={`/register`}>
            <div className="font-medium text-purple-600 hover:underline">
              Đăng ký
            </div>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
