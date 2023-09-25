import { Button, Modal } from "react-bootstrap";
import UserList from "../Chat/UserList";
import "./CreateGroupModel.css";
import axios from "axios";
import { createGroupUrl } from "../../utils/myUrls";
import { useState } from "react";
const CreateGroupModel = (props) => {
  const [newgroupName, setNewGroupName] = useState("");
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
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal
      size="lg"
      show={props.modalVisibility}
      onHide={props.toggleModalVisibility}
    >
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto fs-2">Create a Group</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <input
          placeholder="Group Name"
          type="text"
          className="group-name-input"
          onChange={(e) => setNewGroupName(e.target.value)}
          required
        />
        {<UserList usingForSelection={usingForSelection} />}
      </Modal.Body>
      <Modal.Footer className="mx-auto flex-column">
        {/* <h4>Total Amount: ₹{}</h4> */}
        <Button variant="success" onClick={createGroupHandler}>
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModel;
