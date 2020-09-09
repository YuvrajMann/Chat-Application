import React, { Component } from "react";
import io from "socket.io-client";
import { ChatRender } from "./chatRender";
import "./ChatComponent.css";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
let socket;
class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      chatMessage: "",
      chatMessages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    socket = io("http://localhost:5000");
    socket.emit("join", {
      userName: this.props.username,
      roomId: this.props.roomId,
    });
    socket.on("newUser", ({ userName, roomId, msg }) => {
      this.setState({ messages: this.state.messages.concat(msg) });
    });
    socket.on("chat-message", ({ userName, chatMessage }) => {
      this.setState({
        chatMessages: this.state.chatMessages.concat({
          username: userName,
          message: chatMessage,
        }),
      });
    });
  }
  handleChange = (event) => {
    this.setState({ chatMessage: event.target.value });
  };
  handleSubmit = (event) => {
    this.setState({
      chatMessages: this.state.chatMessages.concat({
        username: this.props.username,
        message: this.state.chatMessage,
      }),
    });
    socket.emit("chat-message", {
      userName: this.props.username,
      message: this.state.chatMessage,
      roomId: this.props.roomId,
    });
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className=" col-md-10 mx-auto">
              <Card>
                <CardHeader>Chat.io</CardHeader>
                <CardBody>
                  <div className="chat-area">
                    <ChatRender
                      user_userName={this.props.username}
                      chatMessages={this.state.chatMessages}
                    ></ChatRender>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="input-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-10">
                          <input
                            type="text"
                            label="text-message"
                            value={this.state.chatMessage}
                            onChange={this.handleChange}
                          ></input>
                        </div>
                        <div className="col-2">
                          <button
                            type="submit"
                            id="chat"
                            onClick={this.handleSubmit}
                          >
                            <FontAwesomeIcon
                              icon={faPaperPlane}
                            ></FontAwesomeIcon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatComponent;
