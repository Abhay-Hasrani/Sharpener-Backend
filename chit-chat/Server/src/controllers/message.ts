import { Op } from "sequelize";
import Message from "../models/Message";
import { io } from "../app";
import { makeUniqueRoomId } from "../utils/helper";
import User from "../models/User";
import Group from "../models/Group";

export async function addMessageHandler(req: any, res: any) {
  try {
    const {
      messageText,
      receiverId,
    }: { messageText: string; receiverId: number } = req.body;

    //this req.file property is with the help of multer
    let originalname = null;
    let location = null;
    if (req.file) {
      originalname = req.file.originalname;
      location = req.file.location;
    }
    // console.log("file details:", req.file);
    const newMessage = await req.user.createMessage({
      messageText,
      receiverId,
      fileName: originalname,
      fileUrl: location,
    });
    res.status(200).json(newMessage);

    //alert receiver using their unique room id
    const receiverRoomId = makeUniqueRoomId(receiverId, false);
    io.to(receiverRoomId).emit("new-message", { userId: req.user.id });
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export async function getMessages(req: any, res: any) {
  try {
    const { receiverId } = req.body;
    let lastMessageId: number = +req.params.lastMessageId; //converting to number using +
    if (!lastMessageId) lastMessageId = 0;
    const sentMessages: any = await Message.findAll({
      where: {
        userId: req.user.id,
        receiverId: receiverId,
        id: {
          [Op.gt]: lastMessageId,
        },
      },
    });
    // console.log("sent ", sentMessages);
    let receivedMessages: any = [];
    //if below condition is true that means we are not sending messages to self
    //cause if we are then there are no received messages
    //so if not checked we will send same data in sent and received messages
    if (receiverId !== req.user.id)
      receivedMessages = await Message.findAll({
        where: {
          userId: receiverId,
          receiverId: req.user.id,
          id: {
            [Op.gt]: lastMessageId,
          },
        },
      });
    // console.log("received ", receivedMessages);
    res.status(200).json({ sentMessages, receivedMessages });
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export async function addGroupMessageHandler(req: any, res: any) {
  try {
    const { messageText, groupId }: { messageText: string; groupId: number } =
      req.body;

    let originalname = null;
    let location = null;
    if (req.file) {
      originalname = req.file.originalname;
      location = req.file.location;
    }
    // console.log("file details", req.file);
    const newMessage = await req.user.createMessage({
      messageText,
      groupId,
      fileName: originalname,
      fileUrl: location,
    });
    res.status(200).json(newMessage);

    //alert group using their unique room id
    const group: any = await Group.findByPk(groupId);
    const groupRoomId = makeUniqueRoomId(groupId, true);
    console.log("groupRoomId", groupRoomId);
    io.to(groupRoomId).emit("new-message", { userId: req.user.id });
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export async function getGroupMessages(req: any, res: any) {
  try {
    const { groupId } = req.body;
    let lastMessageId: number = +req.params.lastMessageId; //converting to number using +
    if (!lastMessageId) lastMessageId = 0;
    const sentMessages: any = await Message.findAll({
      where: {
        userId: req.user.id,
        groupId: groupId,
        id: {
          [Op.gt]: lastMessageId,
        },
      },
    });
    // console.log("sent ", sentMessages);
    const receivedMessages: any = await Message.findAll({
      where: {
        userId: { [Op.ne]: req.user.id },
        groupId: groupId,
        id: {
          [Op.gt]: lastMessageId,
        },
      },
    });
    // console.log("received ", receivedMessages);
    res.status(200).json({ sentMessages, receivedMessages });
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}
