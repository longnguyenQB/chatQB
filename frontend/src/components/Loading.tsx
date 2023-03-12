import React from "react";

const Loading = ({ handelCancel }: { handelCancel: any }) => {
  return (
    <div>
      <div className="flex justify-center mt-32">Vui lòng đợi</div>
      <div className="flex justify-center items-center h-20">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="flex justify-center " onClick={() => handelCancel()}>
        <div className=" cursor-pointer bg-red-800 text-white p-3 rounded-md">
          Hủy
        </div>
      </div>
    </div>
  );
};

export default Loading;
