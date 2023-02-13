import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { Message } from "./Message";
import { MessageModel } from "../models/Message";
import { ChatLoader } from "./ChatLoader";
import ChatForm from "./ChatForm";

const Chat = () => {
  const { conversationName } = useParams();
  const { user } = useContext(AuthContext);
  const [participants, setParticipants] = useState<string[]>([]);
  const [conversation, setConversation] = useState<null>(null);
  const [messageHistory, setMessageHistory] = useState<MessageModel[]>([
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content:
        "stringggdsfassdfdsfdsfdsfdsfdsfdsfsdfsdnfkdjfnksnfsakfnskfnaskdfnajsfnsjfnsjkfnskfnsknfsjnsnsfjknsfnsakfnsjdfndsjkfnsadkjf",
      timestamp: "1675761767000",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content:
        "tessttttttsadasdbjkdasbfgjkdsbfkdsnfakdsjndsjnfsdjknfsakjnfaksjnjsdkfnskjd",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "🙁😙😙 xin chào nha",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "1675761767000",
      read: false,
    },
    {
      id: "12312",
      room: "string",
      from_user: {
        username: "Test1",
        token: "string",
      },
      to_user: {
        username: "Test2",
        token: "string",
      },
      content: "string",
      timestamp: "string",
      read: false,
    },
    {
      id: "122",
      room: "string",
      from_user: {
        username: "Test2",
        token: "string",
      },
      to_user: {
        username: "Test1",
        token: "string",
      },
      content: "tesstttttt",
      timestamp: "string",
      read: false,
    },
  ]);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);

  const fetchMessages = async () => {};
  const handleFormSubmit = () => {
    // if (message.length === 0) return;
    // if (message.length > 512) return;
    // sendJsonMessage({
    //   type: "chat_message",
    //   message,
    // });
    // setMessage("");
    // clearTimeout(timeout.current);
    // timeoutFunction();
  };
  return (
    <div className="container mx-auto ">
      <div className=" bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
        <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
          {/* <SearchUsers handleSearch={handleSearch} />

          <AllUsers
            users={searchQuery !== "" ? filteredUsers : users}
            chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
            setChatRooms={setChatRooms}
            onlineUsersId={onlineUsersId}
            currentUser={currentUser}
            changeChat={handleChatChange}
          /> */}
        </div>

        {true ? (
          <div className="lg:col-span-2 lg:block">
            <div className="w-full">
              <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                {/* <Contact chatRoom={currentChat} currentUser={currentUser} /> */}
              </div>

              <div className="relative w-full p-6 overflow-y-auto h-[50rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <ul className="space-y-2">
                  {messageHistory.map((message, index) => (
                    <div key={index}>
                      <Message message={message} />
                    </div>
                  ))}
                </ul>
              </div>

              <ChatForm handleFormSubmit={handleFormSubmit} />
            </div>
          </div>
        ) : (
          <div>win</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
