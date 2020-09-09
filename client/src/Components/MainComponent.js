import React, { Component } from "react";
import AuthComponent from "./AuthenticationComponent/AuthenticationComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import ChatComponent from "./ChatComponent/ChatComponent";
class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const renderChat = ({ match }) => {
      return (
        <ChatComponent
          username={match.params.username}
          roomId={match.params.password}
        ></ChatComponent>
      );
    };
    return (
      <>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <AuthComponent></AuthComponent>}
          ></Route>
          <Route
            path="/chat/:username/:password"
            component={renderChat}
          ></Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(Main);
