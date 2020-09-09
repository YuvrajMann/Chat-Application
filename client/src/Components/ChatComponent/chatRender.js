import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export const ChatRender = (props) => {
  const messages = props.chatMessages.map((message) => {
    return (
      <div
        className={
          message.username === props.user_userName ? "u_message  " : "p_message"
        }
      >
        <p
          className={
            message.username === props.user_userName
              ? "u_message-bubble  "
              : "p_message-bubble"
          }
        >
          {message.message}
        </p>
      </div>
    );
  });
  return <div>{messages}</div>;
};
