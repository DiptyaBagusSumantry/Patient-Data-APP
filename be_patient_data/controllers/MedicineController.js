const Models = require("../models/index.js");
const Medicine = Models.Medicine;
const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
  handleGetPaginator,
} = require("../helper/HandlerError.js");
const { paginator } = require("../helper/Pagination.js");
const { searchWhere } = require("../helper/Search.js");

class MedicineController {
  static async createMedicine(req, res) {
    try {
      const { code, name, price } = req.body;
      await Medicine.create({
        code,
        name,
        price,
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getMedicine(req, res) {
    try {
      const { page, search, sorting } = req.query;
      let whereClause = {};
      //sorting
      whereClause.order = [["name", sorting ? sorting : "ASC"]];

      //searching
      if (search) {
        whereClause.where = searchWhere(search, "name", "code");
      }

      const results = await Medicine.findAll(whereClause);
      handleGetPaginator(res, paginator(results, page ? page : 1, 20));
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailMedicine(req, res) {
    try {
      const get = await Medicine.findOne({
        where: {
          id: req.params.id,
        },
      });
      handleGet(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updatetMedicine(req, res) {
    try {
      const { code, name, price } = req.body;
      const update = await Medicine.update(
        {
          code,
          name,
          price,
        },
        {
          where: { id: req.params.id },
        }
      );
      handleUpdate(res, update);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async deleteMedicine(req, res) {
    try {
      const get = await Medicine.destroy({
        where: { id: req.params.id },
      });
      handleDelete(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MedicineController;
