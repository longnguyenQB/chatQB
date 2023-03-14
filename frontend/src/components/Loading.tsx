import React from "react";

const Loading = ({ handelCancel }: { handelCancel: any }) => {
  return (
    <div>
      {/* <div className="flex justify-center mt-32">Vui lòng đợi, trong lúc đợi thì nhấn vào link giúp adm có chi phí duy trì nhé: https://www.facebook.com/nguyenlongqblt </div> */}
      <div className="flex justify-center mt-32">Vui lòng đợi, trong lúc đợi thì nhấn vào link shopee giúp Admin có chi phí duy trì nhé
      </div>
      <div className="flex justify-center mt-32">
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">link shopee </a>
      </div>
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
