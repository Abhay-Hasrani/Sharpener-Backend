import { Op } from "sequelize";
import Message from "../models/Message";

export async function addMessageHandler(req: any, res: any) {
  try {
    const {
      messageText,
      receiverId,
    }: { messageText: string; receiverId: number } = req.body;
    const newMessage = await req.user.createMessage({
      messageText,
      receiverId,
    });
    res.status(200).json(newMessage);
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
    const receivedMessages: any = await Message.findAll({
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
