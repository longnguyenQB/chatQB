import React from "react";

const Room = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-5">
      <div className="h-28 w-56 rounded-lg bg-red-200 flex justify-center items-center cursor-pointer hover:bg-red-500">
        <div>Tìm nam</div>
      </div>
      <div className="h-28 w-56 rounded-lg bg-red-200 flex justify-center items-center cursor-pointer hover:bg-red-500">
        <div>Tìm nữ</div>
      </div>
      <div className="h-28 w-56 rounded-lg bg-red-200 flex justify-center items-center cursor-pointer hover:bg-red-500">
        <div>Tìm LGBT</div>
      </div>
    </div>
    // </div>
  );
};

export default Room;
