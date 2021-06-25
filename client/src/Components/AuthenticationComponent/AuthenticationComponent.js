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
      <div className="login_wrapper">
        <div className="navbar">
          <FontAwesomeIcon icon={faComments} />
          <span>Chat.io</span>
        </div>
        <div className="wrapper">
          <FontAwesomeIcon icon={faUser} />
          <h1>LOGIN</h1>
          <div className="credentials">
            <div>
              
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="User Name"
                value={this.state.username}
                onChange={this.handelUserNameChange}
              ></input>
            </div>
            <div>
             
              <input
                type="text"
                name="RoomId"
                id="RoomId"
                placeholder="Room Id"
                value={this.state.roomId}
                onChange={this.handelroomIdChange}
              ></input>
            </div>
          </div>

          <Link to={`/chat/${this.state.username}/${this.state.roomId}`}>
            <input type="submit" value="ENTER"></input>
          </Link>
        </div>
      </div>
    );
  }
}
export default AuthComponent;
