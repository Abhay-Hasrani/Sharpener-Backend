import { Button, Modal } from "react-bootstrap";
import UserList from "../UserList";
import "./GroupModel.css";
import axios from "axios";
import {
  addUsersGroupsUrl,
  createGroupUrl,
  makeAdminsGroupsUrl,
  removeUsersGroupsUrl,
} from "../../../utils/myUrls";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/redux/GroupsReducer";
const GroupModel = (props) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.group);
  const [newgroupName, setNewGroupName] = useState("");
  let title = "Error";
  const forCreating = props.forCreating;
  const forAdding = props.forAdding;
  const forRemoving = props.forRemoving;
  const forAdmin = props.forAdmin;
  const usingFor = {};
  if (forCreating) {
    title = "Create Group";
    usingFor.forCreating = true;
  }
  if (forAdding) {
    title = "Add Users";
    usingFor.forAdding = true;
  }
  if (forRemoving) {
    title = "Remove Users";
    usingFor.forRemoving = true;
  }
  if (forAdmin) {
    title = "Make Admin";
    usingFor.forAdmin = true;
  }
  let selectedUserIds = [];

  function usingForSelection(id) {
    //below is code for toggling user selection
    const isPresent = selectedUserIds.find((item) => item === id);
    if (!isPresent) selectedUserIds.push(id);
    else selectedUserIds = selectedUserIds.filter((item) => item !== id);
    console.log(selectedUserIds);
  }

  async function createGroupHandler() {
    try {
      let groupName = newgroupName;
      if (!newgroupName || newgroupName === "")
        groupName = "Group:" + new Date().toLocaleTimeString();
      const result = await axios.post(createGroupUrl, {
        groupName,
        groupUsers: selectedUserIds,
      });
      console.log("Group Created with data:");
      console.log(result.data);
      props.toggleModalVisibility();
    } catch (error) {
      console.log(error);
    }
  }

  async function adminTasksHandler() {
    if (selectedUserIds.length <= 0)
      return alert("Please Choose members from list");
    try {
      const groupId = group.id;
      const userIds = selectedUserIds;
      if (forAdmin) {
        const result = await axios.post(makeAdminsGroupsUrl, {
          groupId,
          userIds,
        });
        console.log(result.data);
      }
      if (forAdding) {
        const result = await axios.post(addUsersGroupsUrl, {
          groupId,
          userIds,
        });
        console.log(result.data);
      }
      if (forRemoving) {
        const result = await axios.post(removeUsersGroupsUrl, {
          groupId,
          userIds,
        });
        console.log(result.data);
      }

      dispatch(getAllGroups(groupId));
      props.toggleModalVisibility();
    } catch (error) {
      console.log(error, error.data);
    }
  }
  return (
    <Modal
      size="lg"
      show={props.modalVisibility}
      onHide={props.toggleModalVisibility}
    >
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto fs-2">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {forCreating && (
          <input
            placeholder="Group Name"
            type="text"
            className="group-name-input"
            onChange={(e) => setNewGroupName(e.target.value)}
            required
          />
        )}
        {<UserList usingForSelection={usingForSelection} {...usingFor} />}
      </Modal.Body>
      <Modal.Footer className="mx-auto flex-column">
        {/* <h4>Total Amount: ₹{}</h4> */}
        <Button
          variant="success"
          onClick={forCreating ? createGroupHandler : adminTasksHandler}
        >
          {title}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupModel;
