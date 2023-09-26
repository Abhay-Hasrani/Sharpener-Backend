import { useSelector } from "react-redux";
import UsersListItem from "./UsersListItem";
import { useState } from "react";
import GroupListItem from "./group/GroupListItem";
import { searchPatternMatch } from "../../utils/helper";

const UserList = (props) => {
  const [filterText, setFilterText] = useState("");
  const allUsers = useSelector((state) => state.users.allUsers);
  const user = useSelector((state) => state.users.user);
  const allGroups = useSelector((state) => state.groups.allGroups);
  const group = useSelector((state) => state.groups.group);
  const isSelecting = props.usingForSelection ? true : false;

  const allUserList = allUsers
    .filter((item) => {
      //Dont show user itself in the list
      if (isSelecting && item.id === user.id) return false;
      //check if user is in group in focus
      const isPresent =
        group && group.users.find((group_user) => group_user.id === item.id);
      //for removing we need users already present in group
      if (props.forRemoving) return isPresent;
      // for adding we need users not present
      if (props.forAdding) return !isPresent;
      //for making admin users should be present and not already admin
      if (props.forAdmin) return isPresent && !isPresent.isAdmin;

      return searchPatternMatch(filterText, item.username);
    })
    .map((item, index) => (
      <UsersListItem
        usingForSelection={props.usingForSelection}
        key={index}
        {...item}
      />
    ));

  const allGroupList = allGroups
    .filter((item) => {
      return searchPatternMatch(filterText, item.groupName);
    })
    .map((item, index) => <GroupListItem key={index} {...item} />);

  return (
    <div id="plist" className="people-list">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <ul className="list-unstyled chat-list mt-2 mb-0">
        {allUserList}
        {!isSelecting && allGroupList}
      </ul>
    </div>
  );
};
export default UserList;
