"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUniqueRoomId = void 0;
function makeUniqueRoomId(id, isGroupId) {
    return `${isGroupId ? "Group_" : "User_"}${id}`;
}
exports.makeUniqueRoomId = makeUniqueRoomId;
