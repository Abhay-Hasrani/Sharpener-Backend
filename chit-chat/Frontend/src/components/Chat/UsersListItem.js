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

const UsersListItem = (props) => {
  const receiver = useSelector((state) => state.users.receiver);
  const isActive = receiver && props.id === receiver.id;
  const dispatch = useDispatch();

  async function userListItemClickHandler() {
    dispatch(userActions.setReceiver(props.id));
    dispatch(getReceiverMessages(props.id));
  }

  return (
    <li
      onClick={userListItemClickHandler}
      className={"clearfix " + (isActive && "active")}
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
            className={"fa fa-circle " + (props.status ? "online" : "online")}
          ></i>
          {" " + (props.lastSeen || "Online")}
        </div>
      </div>
    </li>
  );
};
export default UsersListItem;
