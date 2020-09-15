import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faSignOutAlt,
  faUsers,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
const RenderModalBody = (props) => {
  return props.users.map((user) => {
    return (
      <div className="specific_user">
        <div className="logo">
          {" "}
          <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
        </div>
        <div className="user-name">{user.userName}</div>
      </div>
    );
  });
};
const InfoBar = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className="infos">
      <h3>
        <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
        <BootstrapTooltip title="Exit">
          <Button
            onClick={() => {
              props.handleExit();
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
          </Button>
        </BootstrapTooltip>
      </h3>
      <div className="participants">
        <BootstrapTooltip title="Paricipants">
          <Button
            onClick={() => {
              props.handleGetParticipants();
              toggle();
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
          </Button>
        </BootstrapTooltip>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <span id="header">
              {props.participants.length}{" "}
              {props.participants.length == 1 ? "Participant" : "Participants"}
            </span>
          </ModalHeader>
          <ModalBody>
            <RenderModalBody users={props.participants}></RenderModalBody>
          </ModalBody>
        </Modal>
      </div>
      <div className="roomId">Room Id:{props.roomId}</div>
    </div>
  );
};

export default InfoBar;
