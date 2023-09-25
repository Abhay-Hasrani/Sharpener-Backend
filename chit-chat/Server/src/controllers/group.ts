import database from "../db/database";
import Group from "../models/Group";
import User from "../models/User";

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
    const groupMembers = await newGroup.setUsers(groupUsers, { transaction });

    res.status(200).json(groupMembers);
    await transaction.commit();
  } catch (error: any) {
    await transaction.rollback();
    console.log(error);
    res.status(400).json(error.message);
  }
}
