import React from "react";

const Room = () => {
  return (
    <div className="flex justify-center items-center mt-72 space-x-5">
      <div className="h-28 w-56 rounded-lg bg-fuchsia-400 flex justify-center items-center cursor-pointer text-white hover:bg-fuchsia-600 focus:outline-none focus:bg-fuchsia-600">
        <div>Tìm nam</div>
      </div>
      <div className="h-28 w-56 rounded-lg bg-fuchsia-400 flex justify-center items-center cursor-pointer text-white hover:bg-fuchsia-600 focus:outline-none focus:bg-purple-600">
        <div>Tìm nữ</div>
      </div>
      <div className="h-28 w-56 rounded-lg bg-fuchsia-400 flex justify-center items-center cursor-pointer text-white hover:bg-fuchsia-600 focus:outline-none focus:bg-purple-600">
        <div>Tìm LGBT</div>
      </div>
    </div>
    // </div>
  );
};

export default Room;
