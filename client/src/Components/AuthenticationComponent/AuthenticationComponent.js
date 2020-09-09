import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AuthenticationComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      roomId: "",
    };
    this.handelUserNameChange = this.handelUserNameChange.bind(this);
    this.handelroomIdChange = this.handelroomIdChange.bind(this);
  }
  handelUserNameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handelroomIdChange(event) {
    this.setState({
      roomId: event.target.value,
    });
  }
  render() {
    return (
      <>
        <div className="navbar">
          <FontAwesomeIcon icon={faComments} />
          <span>Chat.io</span>
        </div>
        <div className="wrapper">
          <FontAwesomeIcon icon={faUser} />
          <h1>LOGIN</h1>
          <div className="credentials">
            <div>
              <label for="UserName">USER NAME</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={this.state.username}
                onChange={this.handelUserNameChange}
              ></input>
            </div>
            <div>
              <label for="RoomId">ROOM ID</label>
              <input
                type="text"
                name="RoomId"
                id="RoomId"
                value={this.state.roomId}
                onChange={this.handelroomIdChange}
              ></input>
            </div>
          </div>

          <Link to={`/chat/${this.state.username}/${this.state.roomId}`}>
            <input type="submit" value="ENTER"></input>
          </Link>
        </div>
      </>
    );
  }
}
export default AuthComponent;
