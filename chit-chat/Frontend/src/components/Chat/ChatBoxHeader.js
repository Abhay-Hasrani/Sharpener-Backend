import { useState } from "react";
import { useSelector } from "react-redux";
import GroupModel from "./group/GroupModel";

/**
 * Chat Box Header
 * It takes below props
 * @param {string} userName - Username of the person whose chat box is active.
 * @param {string} lastSeen - Last Seen Of the user.
 * @param {string} profilePhotoUrl - (Optional) You can set the profile url also;
 * @returns Chat Box Header Component
 */
const ChatBoxHeader = (props) => {
  const [showAddModal, toggleAddModal] = useState(false);
  const [showRemoveModal, toggleRemoveModal] = useState(false);
  const [showAdminModal, toggleAdminModal] = useState(false);
  const receiver = useSelector((state) => state.users.receiver);
  const isGroupInFocus = useSelector((state) => state.groups.isGroupInFocus);
  const group = useSelector((state) => state.groups.group);
  const user = useSelector((state) => state.users.user);

  let isAdmin = false;
  let userName = receiver.username;
  let profilePhotoUrl = receiver.profilePhotoUrl;
  let userNameString = null;
  if (group && isGroupInFocus) {
    isAdmin = group.users.find((item) => item.id === user.id).isAdmin;
    userName = group.groupName;
    profilePhotoUrl = group.profilePhotoUrl;
    userNameString = group.users.map((item) => item.username).join(", ");
  }

  function addToGroupHandler() {
    if (!isAdmin) return alert("Sorry!!! Only admins can add to the group");
    toggleAddModal(!showAddModal);
  }
  function removeFromGroupHandler() {
    if (!isAdmin)
      return alert("Sorry!!! Only admins can remove from the group");
    toggleRemoveModal(!showRemoveModal);
  }
  function makeGroupAdminHandler() {
    if (!isAdmin)
      return alert("Sorry!!! Only admins can make other user admins");
    toggleAdminModal(!showAdminModal);
  }

  return (
    <div className="chat-header clearfix">
      <div className="row">
        <div className="col-lg-6">
          <div data-toggle="modal" data-target="#view_info">
            <img
              src={
                profilePhotoUrl ||
                "https://bootdey.com/img/Content/avatar/avatar2.png"
              }
              alt="avatar"
            />
          </div>
          <div className="chat-about">
            <h6 className="m-b-0">{userName || "Aiden Chavez"}</h6>
            {/* <small>Last seen: {props.lastSeen || "some time"}</small> */}
            {isGroupInFocus && (
              <p className="p-group-usernames expand">{userNameString}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6 hidden-sm text-right">
          <button className="btn btn-outline-secondary m-1">
            <i className="fa fa-camera"></i>
          </button>
          <button className="btn btn-outline-primary m-1">
            <i className="fa fa-image"></i>
          </button>
          {/* <button className="btn btn-outline-info m-1">
            <i className="fa-solid fa-circle-info"></i>
          </button> */}
          {isGroupInFocus && (
            <>
              <button
                onClick={addToGroupHandler}
                className="btn btn-outline-success m-1"
              >
                <i className="fa-solid fa-user-plus" />
              </button>
              <GroupModel
                forAdding
                modalVisibility={showAddModal}
                toggleModalVisibility={toggleAddModal}
              />
              <button
                onClick={removeFromGroupHandler}
                className="btn btn-outline-danger m-1"
              >
                <i className="fa-solid fa-user-minus" />
              </button>
              <GroupModel
                forRemoving
                modalVisibility={showRemoveModal}
                toggleModalVisibility={toggleRemoveModal}
              />
              <button
                onClick={makeGroupAdminHandler}
                className="btn btn-outline-info m-1"
              >
                <i className="fa fa-cogs"></i>
              </button>
              <GroupModel
                forAdmin
                modalVisibility={showAdminModal}
                toggleModalVisibility={toggleAdminModal}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
