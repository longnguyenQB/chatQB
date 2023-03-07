import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { MessageModel } from "../models/Message";
import { format } from "timeago.js";

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function Message({ message }: { message: MessageModel }) {
  const { user } = useContext(AuthContext);
  function formatMessageTimestamp(timestamp: string) {
    const date = new Date();
    return date.toLocaleTimeString().slice(0, 4);
  }
  return (
    <>
      <li
        className={classNames(
          "mt-1 mb-1 flex",
          user!.username === message.to_user.username
            ? "justify-start"
            : "justify-end"
        )}
      >
        <div>
          <div
            className={classNames(
              user!.username === message.to_user.username
                ? "text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
                : "bg-blue-600 dark:bg-blue-500 text-white",
              "relative max-w-xl px-4 py-2 rounded-lg shadow"
            )}
          >
            <span className="block font-normal ">{message.content}</span>
          </div>
          <span
            className={classNames(
              user!.username === message.to_user.username
                ? "text-left"
                : "text-right",
              "block text-sm   text-gray-700 dark:text-gray-400"
            )}
          >
            {format(message.created_at, "vi_VN")}
          </span>
        </div>
      </li>
    </>
  );
}
