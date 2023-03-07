import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [gender, setGender] = useState(null);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const options = [
    { value: "MALE", label: "Nam" },
    { value: "FEMALE", label: "Nữ" },
    { value: "LGBT", label: "LBGT" },
  ];

  const onSubmit = async (dataForm: any) => {
    try {
      await axios
        .post("http://localhost:8909/api/register/", {
          ...dataForm,
          gender: gender,
        })
        .then(({ data, status }) => {
          if (status == 201) {
            const res = login(data?.email, dataForm?.password);
            if (res?.error || res?.data) {
              if (res?.data && res?.data.detail) {
                // setError(res?.data?.detail);
                // console.log(res?.data && res?.data.detail);
              }
            } else {
              navigate("/");
            }
          }
        });
    } catch {}
  };

  return (
    <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1
          style={{ fontFamily: "Awesome" }}
          className="text-9xl font-semibold text-center text-purple-700"
        >
          Đăng ký
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
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Tuổi
            </label>
            <input
              type="number"
              {...register("age")}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Giới tính
            </label>
            <Select
              className="focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              isSearchable={false}
              options={options}
              onChange={(val: any) => setGender(val.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Thành phố
            </label>
            <input
              type="text"
              {...register("address")}
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
              Đăng ký
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Đã có tài khoản?{" "}
          <Link
            to={"/login"}
            className="font-medium text-purple-600 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
