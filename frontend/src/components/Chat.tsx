import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { Message } from "./Message";
import { MessageModel } from "../models/Message";
import ChatForm from "./ChatForm";
import Loading from "./Loading";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Chat = () => {
  const { conversationName } = useParams();
  const { user } = useContext(AuthContext);
  const timeout = useRef<any>();
  const [isStart, setStart] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { readyState, sendJsonMessage } = useWebSocket(
    user
      ? `wss://bw780ixpc0.execute-api.ap-southeast-1.amazonaws.com/production`
      : null,
    {
      queryParams: {
        token: user ? user.access : "",
      },
      onOpen: () => {
        console.log("Connected!");
      },
      onClose: () => {
        console.log("Disconnected!");
      },
      // onMessage handler
      onMessage: (e) => {
        const data = JSON.parse(e?.data);
        console.log(data);

        switch (data) {
          case "pulicMessage":
            setMessageHistory((prev: any) => [...prev, data.message]);
            sendJsonMessage({
              type: "read_messages",
            });
            break;
          case "user_join":
            setStart(true);
            break;
          case "user_leave":
            setLeave(true);
            break;
          case "typing":
            // updateTyping(data);
            break;
          default:
            console.error("Unknown message type!");
            break;
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const [participants, setParticipants] = useState<string[]>([]);
  const [conversation, setConversation] = useState<null>(null);
  const [isLeave, setLeave] = useState<boolean>(false);
  const [messageHistory, setMessageHistory] = useState<MessageModel[]>([]);

  useEffect(() => () => clearTimeout(timeout.current), []);
  const handleFormSubmit = (message: string) => {
    if (message.length === 0) return;
    if (message.length > 512) return;
    sendJsonMessage({
      action: "sendPrivate",
    });
  };

  return (
    <div className="container mx-auto ">
      {isStart ? (
        <div className=" bg-white border-x border-t border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
          <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
            <div className="flex justify-center mt-10">
              <div
                onClick={() => setShowModal(true)}
                className=" flex align-middle items-center justify-center w-20 h-10 bg-purple-600 rounded-md cursor-pointer text-white"
              >
                {" "}
                Báo cáo
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <div className=" flex align-middle items-center justify-center w-20 h-10 bg-purple-600 rounded-md cursor-pointer text-white">
                Thoát
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:block">
            <div className="w-full">
              <div className="p-3 bg-white  border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                {/* <Contact chatRoom={currentChat} currentUser={currentUser} /> */}
              </div>

              <div className="relative w-full p-6 overflow-y-auto h-[40rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                {isLeave && <div>Người dùng đã rời khỏi cuộc trò chuyện</div>}
                <ul className="space-y-2">
                  {messageHistory.map((message, index) => (
                    <div key={index}>
                      <Message message={message} />
                    </div>
                  ))}
                </ul>
              </div>

              {!isLeave && <ChatForm handleFormSubmit={handleFormSubmit} />}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Báo cáo</h3>
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
                    Làm sao mà báo cáo?
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
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Báo cáo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Chat;
