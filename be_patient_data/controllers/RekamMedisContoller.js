const Models = require("../models/index");
const RekamMedis = Models.HistoryPatient;
const Patient = Models.Patient;
const Transaction = Models.Transaction;
const {
  handlerError,
  handleCreate,
  handleGet,
  handleGetPaginator,
  handleDelete,
} = require("../helper/HandlerError.js");
const { paginator } = require("../helper/Pagination.js");
const { searchWhere } = require("../helper/Search.js");
const { accesToken } = require("../helper/chekAccessToken.js");
const SGKMS = require("../utils/sg_kms.js");

class RekamMedisController {
  static async createRekamMedis(req, res) {
    try {
      const token = accesToken(req);
      const sessionToken = await Models.User.findOne({
        where: {
          id: token.id,
        },
        attributes: ["session_token"],
        raw: true,
      });

      const { date, diagnosis, therapy, service, description, patient_id } =
        req.body;

      const sealData = await SGKMS.seal(sessionToken.session_token, [
        date,
        diagnosis,
        therapy,
        service,
        description,
      ]);

      const {
        [0]: dateSeal,
        [1]: diagnosisSeal,
        [2]: therapySeal,
        [3]: serviceSeal,
        [4]: descriptionSeal,
      } = sealData.result.ciphertext;

      await RekamMedis.create({
        date: dateSeal,
        diagnosis: diagnosisSeal,
        therapy: therapySeal,
        description: descriptionSeal,
        service: serviceSeal,
        patientId: patient_id,
      });
      handleCreate(res);
    } catch (error) {
      // console.log(error)
      if (error.response) {
        return res.status(500).json(error.response.data);
      }
      handlerError(res, error);
    }
  }
  static async getRM(req, res) {
    try {
      const { page, search, sorting } = req.query;
      let whereClause = { include: { model: Patient } };
      //sorting
      whereClause.order = [["createdAt", sorting ? sorting : "DESC"]];

      //searching
      if (search) {
        whereClause.where = searchWhere(
          search,
          "history_patients.id",
          "patient.fullname"
        );
      }

      await RekamMedis.findAll(whereClause).then((data) => {
        const results = data.map((mapping) => {
          const {
            id,
            date,
            description,
            service,
            odontogram,
            diagnosis,
            therapy,
          } = mapping.dataValues;
          // console.log(service)
          const {
            id: id_patient,
            number_regristation,
            phone,
            gender,
            work,
            date_birth,
            fullname,
          } = mapping.dataValues.patient;

          // let hasil = "";
          // const proses = JSON.parse(service);
          // proses.forEach((data) => {
          //   hasil += data.name + ", ";
          // });

          return {
            id,
            id_patient,
            number_regristation,
            description,
            date,
            fullname,
            gender,
            phone,
            hasil: service,
            diagnosis,
            therapy,
            work,
            date_birth,
          };
        });
        handleGetPaginator(res, paginator(results, page ? page : 1, 20));
      });

      // await RekamMedis.findAll(whereClause).then((get) => {
      //   const results = get.map((data) => {
      //     const {
      //       id,
      //       date,
      //       // description,
      //       // service,
      //       // odontogram,
      //       // diagnosis,
      //       // therapy,
      //     } = data.dataValues;

      //     const {
      //       text: descriptionText,
      //       mac: descriptionMac,
      //       iv: descriptionIv,
      //     } = JSON.parse(data.dataValues.description);
      //     const {
      //       text: serviceText,
      //       mac: serviceMac,
      //       iv: serviceIv,
      //     } = JSON.parse(data.dataValues.service);
      //     // console.log(serviceText)
      //     const {
      //       text: diagnosisText,
      //       mac: diagnosisMac,
      //       iv: diagnosisIv,
      //     } = JSON.parse(data.dataValues.diagnosis);
      //     const {
      //       text: therapyText,
      //       mac: therapyMac,
      //       iv: therapyIv,
      //     } = JSON.parse(data.dataValues.therapy);
      //     const {
      //       text: fullnameText,
      //       mac: fullnameMac,
      //       iv: fullnameIv,
      //     } = JSON.parse(data.dataValues.patient.fullname);

      //     const {
      //       id: id_patient,
      //       number_regristation,
      //       phone,
      //       gender,
      //       work,
      //       date_birth,
      //     } = data.dataValues.patient;
      //     // let hasil = "";
      //     // const proses = JSON.parse(service);
      //     // proses.forEach((data) => {
      //     //   hasil += data.name + ", ";
      //     // });
      //     return {
      //       id,
      //       id_patient,
      //       number_regristation,
      //       description: descriptionText,
      //       date,
      //       fullname: fullnameText,
      //       gender,
      //       phone,
      //       hasil: serviceText,
      //       diagnosis: diagnosisText,
      //       therapy: therapyText,
      //       work,
      //       date_birth,
      //     };
      //   });
      //   handleGetPaginator(res, paginator(results, page ? page : 1, 20));
      // });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailRM(req, res) {
    try {
      const token = accesToken(req);
      const sessionToken = await Models.User.findOne({
        where: {
          id: token.id,
        },
        attributes: ["session_token"],
        raw: true,
      });

      const get = await RekamMedis.findOne({
        where: { id: req.params.id },
        include: {
          model: Patient,
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
        },
        raw: true,
      });
      // return res.send(get)
      // console.log(get['patient.id'])
      if (!get) {
        return handleGet(res, get);
      }

      const {
        id,
        diagnosis,
        therapy,
        date,
        description,
        service,
        ["patient.id"]: id_patient,
        ["patient.number_regristation"]: number_regristation,
        ["patient.text"]: fullname,
        ["patient.place_birth"]: place_birth,
        ["patient.date_birth"]: date_birth,
        ["patient.gender"]: gender,
        ["patient.phone"]: phone,
        ["patient.address"]: address,
        ["patient.work"]: work,
        // ['patient.history_illness']: history_illness,
        ["patient.mac"]: mac,
        ["patient.iv"]: iv,
        ["patient.keyVersion"]: keyVersion,
      } = get;
      // console.log(get)
      const decryptData = await SGKMS.decryptData(sessionToken.session_token, [
        {
          id: id_patient,
          text: fullname,
          place_birth,
          date_birth,
          gender,
          address,
          work,
          phone,
          keyVersion,
          mac,
          iv,
        },
      ]);

      const unseal = await SGKMS.unseal(sessionToken.session_token, [
        date,
        diagnosis,
        therapy,
        description,
        service,
      ]);

      handleGet(res, {
        id,
        id_patient,
        date: unseal.result.plaintext[0],
        diagnosis: unseal.result.plaintext[1],
        therapy: unseal.result.plaintext[2],
        description: unseal.result.plaintext[3],
        service: unseal.result.plaintext[4],
        number_regristation,
        fullname: decryptData.result.plaintext[0],
        gender,
        phone,
        work,
        date_birth,
        place_birth,
      });
    } catch (error) {
      if (error.response) {
        return res.status(500).json(error.response.data);
      }
      handlerError(res, error);
    }
  }
  static async getDetailbyPatient(req, res) {
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

      const get = await Patient.findAll({
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
        include: {
          model: RekamMedis,
        },
      });

      const decryptData = await SGKMS.decryptData(sessionToken.session_token, [
        get[0].dataValues,
      ]);

      // const {} =get[0]
      // return res.send(decryptData)
      if (get.length <= 0) {
        return handleGet(res, get);
      }
      if (get[0].dataValues.history_patients.length <= 0) {
        return handlerError(res, { message: "History Rekam Medis Not Found" });
      }

      const rekamMedis = get[0].dataValues.history_patients;
      const data = await Promise.all(
        rekamMedis.map(async (reuslt) => {
          const { id, date, diagnosis, therapy, description, service } =
            reuslt.dataValues;

          return {
            id,
            number_regristation: get[0].dataValues.number_regristation,
            date,
            diagnosis,
            therapy,
            description,
            service,
            fullname: decryptData.result.plaintext[0],
          };
        })
      );
      // return res.send(data)
      handleGet(res, data);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async deleteRekamMedis(req, res) {
    try {
      const deleteRM = await RekamMedis.destroy({
        where: {
          id: req.params.id,
        },
      });
      handleDelete(res, deleteRM);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = RekamMedisController;
