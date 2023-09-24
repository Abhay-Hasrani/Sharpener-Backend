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
