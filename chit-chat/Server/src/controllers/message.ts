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
    const sentMessages = await req.user.getMessages({ where: { receiverId } });
    // console.log("sent ", sentMessages);
    const receivedMessages: any = await Message.findAll({
      where: { receiverId: req.user.id, userId: receiverId },
    });
    // console.log("received ", receivedMessages);
    res.status(200).json({ sentMessages, receivedMessages });
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
}
