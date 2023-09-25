import { useSelector } from "react-redux";
import UsersListItem from "./UsersListItem";
import { useState } from "react";

const UserList = (props) => {
  const [filterText, setFilterText] = useState("");
  const allUsers = useSelector((state) => state.users.allUsers);

  const allUserList = allUsers
    .filter((item) => {
      if (filterText === "") return true;
      else {
        // 'i' is for case insensitive
        const pattern = new RegExp(`${filterText}`, "i");
        // console.log(item.username.toLowerCase().match(pattern));
        return item.username.toLowerCase().match(pattern);
      }
    })
    .map((item, index) => <UsersListItem usingForSelection={props.usingForSelection} key={index} {...item} />);

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
      <ul className="list-unstyled chat-list mt-2 mb-0">{[allUserList]}</ul>
    </div>
  );
};
export default UserList;
