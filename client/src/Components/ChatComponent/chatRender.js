import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export const ChatRender = (props) => {
  var date = new Date();
  const className_value = (user_name) => {
    if (user_name === "admin") {
      return "admin_message";
    } else if (user_name == props.user_userName) {
      return "u_message";
    } else {
      return "p_message";
    }
  };
  const messages = props.chatMessages.map((message) => {
    return (
      <div
        className={
          // if(message.username===admin)
          className_value(message.username)
        }
      >
        <p
          className={
            message.username === props.user_userName
              ? "u_message-bubble  "
              : "p_message-bubble"
          }
        >
          <div className="senders_name">
            {" "}
            {message.username === props.user_userName ? "" : message.username}
          </div>
          <div className="message">{message.message}</div>
          <div className="time">
            {date.getHours()}:
            {date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes()}
          </div>
        </p>
      </div>
    );
  });
  return <div>{messages}</div>;
};
