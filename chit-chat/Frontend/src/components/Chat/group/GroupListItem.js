import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../store/GroupsReducer";

const GroupListItem = (props) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.group);
  const isGroupInFocus = useSelector((state) => state.groups.isGroupInFocus);

  const isActive = isGroupInFocus && group && props.id === group.id;
  const groupName = props.groupName;
  // const lastSeen = "Active"; //props.lastSeen;

  function groupListItemClickHandler() {
    dispatch(groupActions.setIsGroupInFocus(true));
    dispatch(groupActions.setGroup(props.id));
  }

  const userNameString = props.users.map((item) => item.username).join(", ");
  return (
    <li
      onClick={groupListItemClickHandler}
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
        <div className="name">{groupName || "Aiden Chavez"}</div>
        <div className="status">
          {/* {" " + lastSeen} */}
          {/* {" " + (isLogged ? "online" : "offline")} */}
          <p className="p-group-usernames">{userNameString}</p>
        </div>
      </div>
    </li>
  );
};
export default GroupListItem;
