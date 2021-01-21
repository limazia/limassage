const connection = require("../../database/connection");
const moment = require("moment");
const cryptoRandomString = require("crypto-random-string");

moment.locale("pt-br");

class MessageController {
  async listAllMessages(request, response, next) {
    try {
      const messages = await connection("messages").select("*").limit(1).orderBy("createdAt", "desc");

      if (messages.length <= 0) {
        return response.json([]);
      }

      request.io.emit("newMessage", messages[0]);
      const { message_id, message_user, message_content, createdAt } = messages[0];

      return response.json({
        message_id,
        message_user,
        message_content,
        createdAt: moment(createdAt).format("L"),
      });
    } catch (error) {
      next(error);
    }
  }

  async createMessage(request, response, next) {
    try {
      const { message_user, message_content } = request.body;
      const message_id = cryptoRandomString({ length: 13 });

      if (!message_user) {
        return response.json({ error: "Digite um nome de usuário" })
      }

      if (!message_content) {
        return response.json({ error: "Digite uma mensagem" })
      }

      await connection("messages").insert({
        message_id,
        message_user,
        message_content,
      });

      return response.json({ message: "Mensagem enviada com sucesso!"});
    } catch (error) {
      next(error);
    }
  }

  async deleteMessageById(request, response, next) {
    try {
      const { message_id } = request.params;
      const message = await connection("messages").where({ message_id });

      if (message.length <= 0) {
        return response.json([]);
      }

      await connection("messages").where({ message_id }).del();
      return response.json([]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();
