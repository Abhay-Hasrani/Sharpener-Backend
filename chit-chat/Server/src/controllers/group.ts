import { json } from "body-parser";
import database from "../db/database";
import Group from "../models/Group";
import GroupUser from "../models/GroupUser";
import User from "../models/User";
import { Identifier } from "sequelize";
import { io } from "../app";
import { makeUniqueRoomId } from "../utils/helper";

export async function createGroup(req: any, res: any) {
  const transaction = await database.transaction();
  try {
    type typeCreateGroupReqBody = {
      groupName: string;
      groupUsers: Array<Number>;
    };
    const { groupName, groupUsers }: typeCreateGroupReqBody = req.body;
    // console.log(groupName, groupUsers);
    //create group with name
    const newGroup: any = await Group.create({ groupName }, { transaction });

    //add creator as admin first
    const addGroupCreator = await newGroup.addUser(req.user, {
      through: { isAdmin: true },
      transaction,
    });

    //add other members of group here gorup users should be array of ids of users
    //id of creator is added in this first brcause setUsers is Overriding addUser
    //but adding creator id solves problem
    groupUsers.push(req.user.id);
    const groupMembers = await newGroup.setUsers(groupUsers, { transaction });

    res.status(200).json(groupMembers);
    //alert all members about new group
    const roomIds = groupUsers.map((id) =>
      makeUniqueRoomId(id as number, false)
    );
    console.log(roomIds);
    io.to(roomIds).emit(
      "new-group",
      `you were added to ${groupName} by ${req.user.username}`
    );
    await transaction.commit();
  } catch (error: any) {
    await transaction.rollback();
    console.log(error);
    res.status(400).json(error.message);
  }
}

export async function getAllGroups(req: any, res: any) {
  try {
    const groups = await req.user.getGroups();
    const allGroups = await Promise.all(
      groups.map(async (group: any) => {
        let users = await group.getUsers();

        users = users.map((user: any) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          mob_number: user.mob_number,
          isAdmin: user.groupUsers.isAdmin,
        }));
        group.dataValues.users = users;
        return group;
      })
    );

    // console.log(allGroups);
    res.status(200).json(allGroups);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

type typeAdminTasks = { groupId: Number | Identifier; userIds: Array<Number> };
export async function makeGroupAdmins(req: any, res: any) {
  try {
    const { groupId, userIds }: typeAdminTasks = req.body;
    const groupUserRow: any = await GroupUser.findOne({
      where: {
        userId: req.user.id,
        groupId: groupId,
      },
    });
    if (!groupUserRow.isAdmin) throw new Error("Doesn't have admin access");
    const updatedRows = [];
    for (const userId of userIds) {
      const row = await GroupUser.update(
        { isAdmin: true },
        {
          where: {
            userId: userId,
            groupId: groupId,
          },
        }
      );
      console.log(row);
      updatedRows.push(row);
    }
    res.status(200).json("Users successfully upgraded to admins");
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export async function addUsersToGroup(req: any, res: any) {
  try {
    const { groupId, userIds }: typeAdminTasks = req.body;
    const group: any = await Group.findByPk(groupId as Identifier);

    for (const userId of userIds) {
      const row = await group.addUser(userId, { through: { isAdmin: false } });
    }
    res.status(200).json(`Users add to ${group.groupName} successfully`);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export async function removeUsersFromGroup(req: any, res: any) {
  try {
    const { groupId, userIds }: typeAdminTasks = req.body;
    const group: any = await Group.findByPk(groupId as Identifier);

    for (const userId of userIds) {
      const row = await group.removeUser(userId);
    }
    res.status(200).json(`Users removed from ${group.groupName} successfully`);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}
