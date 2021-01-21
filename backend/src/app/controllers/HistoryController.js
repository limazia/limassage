const connection = require("../../database/connection");
const moment = require("moment");
const cryptoRandomString = require("crypto-random-string");

moment.locale("pt-br");

class HistoryController {
  async listAllHistory(request, response, next) {
    try {
      const { page = 1 } = request.query;
      const limit = 10;
      const history = await connection("message_history")
        .select("*")
        .limit(limit)
        .offset(limit * page - limit)
        .orderBy("createdAt", "desc");
      const historyCount = await connection("message_history");
      
      const serializedItems = history.map((item) => {
        const {
          history_id,
          history_user,
          history_content,
          createdAt,
        } = item;
        
        return {
          history_id,
          history_user,
          history_content,
          createdAt: moment(createdAt).format("LLL"),
        };
      });

      if (history.length <= 0) {
        return response.json({ items: [] });
      }

      return response.json({
        total: historyCount.length,
        limit: parseFloat(limit),
        page: parseFloat(page),
        pages: Math.ceil(historyCount.length / limit),
        items: serializedItems
      });
    } catch (error) {
      next(error);
    }
  }

  async createHistory(request, response, next) {
    try {
      const { history_user, history_content } = request.body;
      const history_id = cryptoRandomString({ length: 13 });

      await connection("message_history").insert({
        history_id,
        history_user,
        history_content,
      });

      return response.json({ message: "Criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HistoryController();
