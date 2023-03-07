import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center mt-32">Vui lòng đợi</div>
      <div className="flex justify-center items-center h-80">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
