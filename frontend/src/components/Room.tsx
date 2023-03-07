import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const Room = () => {
  const { user } = useContext(AuthContext);
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
    </div>
    // </div>
  );
};

export default Room;
