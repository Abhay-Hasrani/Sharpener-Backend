import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllGroupsUrl } from "../../../utils/myUrls";

//isGroupInFocus is variable that tells application that currently a group chat is opened
//  and based on this the chatHeader, MessageReducer, setting work
const initialState = {
  allGroups: [],
  group: JSON.parse(localStorage.getItem("group")) || null,
  isGroupInFocus: JSON.parse(localStorage.getItem("isGroupInFocus")) || false,
};

const GroupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setAllGroups(state, action) {
      state.allGroups = action.payload;
    },
    setGroup(state, action) {
      const id = action.payload;
      const currentGroup = state.allGroups.find((item) => item.id === id);
      localStorage.setItem("group", JSON.stringify(currentGroup));
      state.group = currentGroup;
    },
    setIsGroupInFocus(state, action) {
      state.isGroupInFocus = action.payload;
      localStorage.setItem("isGroupInFocus", JSON.stringify(action.payload));
    },
  },
});

/** getAllGroupsUrl here return array of groups where each object is like:
 * group_object{ id,groupName,createdAt,UpdatedAt,users:[{id,userName,email,mob_number,isAdmin},{}...] }
 * @param {number} groupId :Optional if provided group with this id is set as current group and updated in local storage
 */
export function getAllGroups(groupId) {
  return async (dispatch) => {
    const result = await axios.get(getAllGroupsUrl);
    const allGroups = result.data;
    dispatch(groupActions.setAllGroups(allGroups));
    //if groupId is present any active group is manipulated(add-user,remove etc...)
    // so refresh it in local storage to reflect changes
    if (groupId) dispatch(groupActions.setGroup(groupId));
  };
}
export const groupActions = GroupSlice.actions;
export default GroupSlice.reducer;
