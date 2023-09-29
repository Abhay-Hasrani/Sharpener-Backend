export function makeUniqueRoomId(id: number, isGroupId: boolean) {
  return `${isGroupId ? "Group_" : "User_"}${id}`;
}
