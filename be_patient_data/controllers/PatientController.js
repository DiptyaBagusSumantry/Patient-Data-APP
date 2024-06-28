const Models = require("../models/index.js");
const Patient = Models.Patient;
const {
  handleCreate,
  handlerError,
  handleGet,
  handleUpdate,
  handleGetPaginator,
  handleDelete,
} = require("../helper/HandlerError.js");
const sequelize = require("sequelize");
const { paginator } = require("../helper/Pagination.js");
const { searchWhere } = require("../helper/Search.js");
const { Op } = require("sequelize");
const SGKMS = require("../utils/sg_kms.js");
const { accesToken } = require("../helper/chekAccessToken.js");

class PatientController {
  static async createPatient(req, res) {
    try {
      const token = accesToken(req);

      //GetSessionTokenSGKMS
      const sessionToken = await Models.User.findOne({
        where: {
          id: token.id,
        },
        attributes: ["session_token"],
      });

      const {
        fullname,
        place_birth,
        date_birth,
        gender,
        address,
        work,
        phone,
      } = req.body;

      //number_regristation
      let countPatient = await Patient.findAll({
        attributes: ["number_regristation"],
      });
      if (countPatient.length <= 0) {
        countPatient.push({ number_regristation: "000000" });
      }
      countPatient.sort((a, b) => {
        return (
          parseInt(b.number_regristation) - parseInt(a.number_regristation)
        );
      });
      const numberRm = parseInt(countPatient[0].number_regristation) + 1;
      const number_regristation = String(numberRm).padStart(6, "0");

      const encrypt = await SGKMS.encryptData(
        sessionToken.dataValues.session_token,
        [
          {
            number_regristation,
            text: fullname,
            place_birth,
            date_birth,
            gender,
            address,
            work,
            phone,
          },
        ]
      );

      await Patient.create({
        number_regristation,
        fullname: encrypt.result.ciphertext[0].text,
        place_birth,
        date_birth,
        gender,
        address,
        work,
        phone,
        key_version: encrypt.result.keyVersion,
        mac: encrypt.result.ciphertext[0].mac,
        iv: encrypt.result.ciphertext[0].iv,
      });

      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async headerAmount(req, res) {
    try {
      const amountPatient = await Patient.count();
      const amountMedicalRecord = await Models.HistoryPatient.count();
      handleGet(res, { amountPatient, amountMedicalRecord });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getPatient(req, res) {
    try {
      const { page, search, sorting } = req.query;
      const token = accesToken(req);

      //GetSessionTokenSGKMS
      const sessionToken = await Models.User.findOne({
        where: {
          id: token.id,
        },
        attributes: ["session_token"],
        raw: true,
      });

      let whereClause = {};
      //sorting
      whereClause.order = [["number_regristation", sorting ? sorting : "ASC"]];

      //searching
      if (search) {
        whereClause.where = searchWhere(search, "fullname", "phone");
      }

      const getPatient = await Patient.findAll({
        attributes: [
          "id",
          ["fullname", "text"],
          "number_regristation",
          "place_birth",
          "date_birth",
          "gender",
          "address",
          "work",
          "phone",
          ["key_version", "keyVersion"],
          "mac",
          "iv",
        ],
        raw: true,
      });

      const decryptedData = await SGKMS.decryptData(
        sessionToken.session_token,
        getPatient
      );

      const dataDecrypt = getPatient.map((data, x) => {
        const { mac, iv, text, keyVersion, ...rest } = data;
        return {
          fullname: decryptedData.result.plaintext[x],
          ...rest,
        };
      });
      return res.send(dataDecrypt);
    } catch (error) {
      if (error.response.data.fault) {
        return res.status(500).json(error.response.data);
      }
      handlerError(res, error);
    }
  }
  static async detailPatient(req, res) {
    try {
      const token = accesToken(req);

      //GetSessionTokenSGKMS
      const sessionToken = await Models.User.findOne({
        where: {
          id: token.id,
        },
        attributes: ["session_token"],
        raw: true,
      });

      const data = await Patient.findOne({
        where: {
          id: req.params.id,
        },
        attributes: [
          "id",
          ["fullname", "text"],
          "number_regristation",
          "place_birth",
          "date_birth",
          "gender",
          "address",
          "work",
          "phone",
          ["key_version", "keyVersion"],
          "mac",
          "iv",
        ],
        raw: true,
      });
      const decryptData = await SGKMS.decryptData(sessionToken.session_token, [
        data,
      ]);
      const { mac, iv, text, keyVersion, ...rest } = data;
      handleGet(res, {
        fullname: decryptData.result.plaintext[0],
        ...rest,
      });
    } catch (error) {
      if (error.response) {
        return res.status(500).json(error.response.data);
      }
      handlerError(res, error);
    }
  }
  static async updatePatient(req, res) {
    try {
      const {
        fullname,
        place_birth,
        date_birth,
        gender,
        address,
        work,
        phone,
        history_illness,
      } = req.body;
      const updateData = await Patient.update(
        {
          fullname,
          place_birth,
          date_birth,
          gender,
          address,
          work,
          phone,
          history_illness,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      handleUpdate(res, updateData);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async deletePatient(req, res) {
    try {
      const deleteData = await Patient.destroy({
        where: {
          id: req.params.id,
        },
      });
      handleDelete(res, deleteData);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = PatientController;
