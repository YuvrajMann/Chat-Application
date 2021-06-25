import React, { Component } from "react";
import io from "socket.io-client";
import { ChatRender } from "./chatRender";
import "./ChatComponent.css";
import { Card, CardHeader, CardBody, CardFooter,Row,Col,Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSignOutAlt,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import InfoBar from "./InfoBarComponent";
import { Redirect } from "react-router-dom";
import {Editor, EditorState} from 'draft-js';

let socket;
class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      chatMessage: "",
      chatMessages: [],
      exited: false,
      users: [],
      editorState: EditorState.createEmpty()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleGetParticipants = this.handleGetParticipants.bind(this);
    this.onChange = editorState => this.setState({editorState});
  }

  componentDidMount() {
    socket = io("https://chat11app.herokuapp.com/");
    socket.emit("join", {
      userName: this.props.username,
      roomId: this.props.roomId,
    });
    socket.on("newUser", ({ userName, roomId, msg }) => {
      this.setState({
        chatMessages: this.state.chatMessages.concat({
          username: "admin",
          message: msg,
        }),
      });
    });
    socket.on("chat-message", ({ userName, chatMessage }) => {
      this.setState({
        chatMessages: this.state.chatMessages.concat({
          username: userName,
          message: chatMessage,
        }),
      });
    });
    socket.on("disconnect", () => {
      console.log("Disconnected!");
    });

    socket.on("getParticipants", (Users) => {
      Users.map((user) => {
        this.setState({
          users: Users,
        });
      });
    });
  }

  handleGetParticipants = (event) => {
    socket.emit("getParticipants", {});
  };
  handleChange = (event) => {
    this.setState({ chatMessage: event.target.value });
  };
  handleSubmit = (event) => {
    let message=this.state.editorState.getCurrentContent().getPlainText('\u0001');
    this.setState({
      chatMessages: this.state.chatMessages.concat({
        username: this.props.username,
        message: message,
      }),
      chatMessage: "",
      editorState: EditorState.createEmpty()
    });
    socket.emit("chat-message", {
      userName: this.props.username,
      message: message,
      roomId: this.props.roomId,
    });
  };

  handleExit = () => {
    if (socket) {
      socket.disconnect();
      this.setState({
        exited: true,
      });
    }
  };
  render() {
    console.log(this.state.editorState.getCurrentContent().getPlainText('\u0001'));
    if (this.state.exited) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="chat-component">
        <Container>
          <Row>
            <Col md={10} sm={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <InfoBar
                    handleExit={() => {
                      this.handleExit();
                    }}
                    roomId={this.props.roomId}
                    handleGetParticipants={() => this.handleGetParticipants()}
                    participants={this.state.users}
                  ></InfoBar>
                </CardHeader>
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
                        <div className="col-10" style={{backgroundColor:'white',padding:'5px',borderRadius:'5px'}}>
                        <Editor placeholder="Type a message"  editorState={this.state.editorState} onChange={this.onChange} />
                        </div>
                        <div className="col-2">
                          <div
                            type="submit"
                            id="chat"
                            onClick={this.handleSubmit}
                          >
                            <FontAwesomeIcon
                              icon={faPaperPlane}
                            ></FontAwesomeIcon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
        </div>
      
    );
  }
}

export default ChatComponent;
