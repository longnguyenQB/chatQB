import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const Room = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const findRoom = async (room: any) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user?.access}`;
    await axios
      .post("http://localhost:8909/api/find-room/", {
        find_gender: room,
      })
      .then(({ data }) => {
        if (data?.name) {
          navigate(`chats/${data?.name}`);
        } else {
          setShowModal(true);
        }
      });
    // const data = await response.json();
    // setActiveConversations(data);
  };

  return (
    <div className="flex justify-center items-center mt-72 space-x-5">
      <div
        onClick={() => findRoom("MALE")}
        className="h-28 w-56 rounded-lg bg-fuchsia-400 flex justify-center items-center cursor-pointer text-white hover:bg-fuchsia-600 focus:outline-none focus:bg-fuchsia-600"
      >
        <h2>Tìm nam</h2>
      </div>
      <div
        onClick={() => findRoom("FEMALE")}
        className="h-28 w-56 rounded-lg bg-fuchsia-400 flex justify-center items-center cursor-pointer text-white hover:bg-fuchsia-600 focus:outline-none focus:bg-purple-600"
      >
        <h2>Tìm nữ</h2>
      </div>
      <div
        onClick={() => findRoom("LGBT")}
        className="h-28 w-56 rounded-lg bg-fuchsia-400 flex justify-center items-center cursor-pointer text-white hover:bg-fuchsia-600 focus:outline-none focus:bg-purple-600"
      >
        <h2>Tìm LGBT</h2>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Thông báo</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Giới hạn tìm kiếm là 5 lần mỗi ngày, vui lòng tìm kiếm vào
                    ngày mai!
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
    // </div>
  );
};

export default Room;
