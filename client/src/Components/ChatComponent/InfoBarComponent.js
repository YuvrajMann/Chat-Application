import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faSignOutAlt,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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

const InfoBar = (props) => {
  console.log({ props });
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
          <Button>
            {" "}
            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
          </Button>
        </BootstrapTooltip>
      </div>
      <div className="roomId">Room Id:{props.roomId}</div>
    </div>
  );
};

export default InfoBar;
