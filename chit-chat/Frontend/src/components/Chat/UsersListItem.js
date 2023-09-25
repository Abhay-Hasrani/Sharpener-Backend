/**
 * It is a suser List item for the all connected in message/chat box
 * it takes below props
 * @param {string} username - The name of the person.
 * @param {boolean} status - If online set true;
 * @param {string} lastSeen - Last Seen Of the user.
 * @param {string} profilePhotoUrl - (Optional) You can set the profile url also;
 * @returns Customized user List  Item
 */

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/UsersReducer";
import { getReceiverMessages } from "../store/MessagesReducer";
import { messageDateFormat } from "../../utils/dateUtil";
import { useState } from "react";

const UsersListItem = (props) => {
  const [isSelected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.users.receiver);
  const isActive = receiver && props.id === receiver.id;
  const isLogged = props.isLogged;
  let lastSeen = null;
  if (!isLogged) lastSeen = messageDateFormat(props.updatedAt);
  else lastSeen = "Online";

  async function userListItemClickHandler() {
    dispatch(userActions.setReceiver(props.id));
    dispatch(getReceiverMessages(props.id));
  }

  const isUsingForSelection = props.usingForSelection;
  function usingForSelection() {
    props.usingForSelection(props.id);
    setSelected(!isSelected);
  }

  return (
    <li
      onClick={
        isUsingForSelection ? usingForSelection : userListItemClickHandler
      }
      className={
        "clearfix " +
        (isActive && "active") +
        (isUsingForSelection && isSelected && " bg-success-subtle")
      }
    >
      <img
        src={
          props.profilePhotoUrl ||
          "https://bootdey.com/img/Content/avatar/avatar2.png"
        }
        alt="avatar"
      />
      <div className="about">
        <div className="name">{props.username || "Aiden Chavez"}</div>
        <div className="status">
          {" "}
          <i
            className={"fa fa-circle " + (isLogged ? "online" : "offline")}
          ></i>
          {" " + lastSeen}
          {/* {" " + (props.lastSeen || "lasts")} */}
          {/* {" " + (isLogged ? "online" : "offline")} */}
        </div>
      </div>
    </li>
  );
};
export default UsersListItem;
