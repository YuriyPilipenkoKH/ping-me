

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("deleteMessage", async ({ messageId, chatId }) => {
    try {
      await MessageModel.findByIdAndDelete(messageId);

      // Emit to all clients in the same chat room
      io.to(chatId).emit("messageDeleted", { messageId });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
