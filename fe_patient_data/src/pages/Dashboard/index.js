import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Api from "../../Api";
import moment from "moment";
import { OdontogramGambar } from "../../assets";

const Dashboard = () => {
  const [dataRekamMedis, setDataRekamMedis] = useState("");
  const [detailRekamMedis, setDetailRekamMedis] = useState(false);
  // const [modalAlert, setModalAlert] = useState(false);
  const [dataDetailRekamMedis, setDataDetailRekamMedis] = useState("");
  // const [dataOdontogram, setDataOdontogram] = useState([]);
  const [amountHeader, setAmountHeader] = useState("");
  // const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const formatServiceNames = (param) => {
    return param.map((service) => service.name).join(", ");
  };

  const getRekamMedis = async () => {
    try {
      const response = await Api.GetRekamMedis(
        localStorage.getItem("token"),
        "",
        ""
      );
      console.log(response);
      setDataRekamMedis(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAmountHeader = async () => {
    try {
      const response = await Api.AmountHeader(
        localStorage.getItem("token"),
        "",
        ""
      );
      // console.log(response);
      setAmountHeader(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  // const openDetailRekamMedis = async (id) => {
  //   setDetailRekamMedis(!detailRekamMedis);
  //   try {
  //     const response = await Api.GetRekamMedisById(
  //       localStorage.getItem("token"),
  //       id
  //     );
  //     console.log("detail", response);
  //     setDataDetailRekamMedis(response.data.data);
  //     // setDataOdontogram(response.data.data.odontogram);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getRekamMedis();
    getAmountHeader();
  }, []);

  return (
    <div>
      {/* <Modal
        activeModal={modalAlert}
        title={""}
        buttonClose={() => setModalAlert(!modalAlert)}
        width={"750px"}
        content={
          <div className=" w-full space-x-[20px]">
            <h1 className="font-semibold mb-10 pl-4">Pilih Status Pasien: </h1>
            <button
              onClick={() => navigate("/pasien")}
              className="rounded-md p-16 border bg-slate-200 text-3xl font-semibold shadow"
            >
              Pasien Lama
            </button>
            <button
              onClick={() => navigate("/pasien/create")}
              className="rounded-md p-16 border bg-slate-700 text-3xl font-semibold text-white shadow"
            >
              Pasien Baru
            </button>
          </div>
        }
      />
      <Modal
        activeModal={detailRekamMedis}
        title={`Detail Rekam Medis ${dataDetailRekamMedis?.fullname}`}
        buttonClose={() => setDetailRekamMedis(!detailRekamMedis)}
        width={"832px"}
        content={
          <div className=" w-full space-y-[40px]">
            <div className="bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[12px] font-semibold">
              <div className="font-bold text mb-5 space-y-2">
                <h1>
                  No Rekam Medis :{" "}
                  {dataDetailRekamMedis.number_regristation
                    ? dataDetailRekamMedis.number_regristation
                    : "-"}
                </h1>
                <h1 className="col-span-3">
                  Tanggal:{" "}
                  {dataDetailRekamMedis.date ? dataDetailRekamMedis.date : "-"}
                </h1>
                <hr className="border-1" />
              </div>

              <div className="grid grid-cols-12 mx-auto">
                <div className="col-span-3">
                  <h1>Diagnosa</h1>
                  <h1>Terapi</h1>
                  <h1>Keterangan</h1>
                  <h1>Layanan</h1>
                </div>
                <div className="col-span-9">
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.diagnosis
                      ? dataDetailRekamMedis.diagnosis
                      : "-"}
                  </h1>
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.therapy
                      ? dataDetailRekamMedis.therapy
                      : "-"}
                  </h1>
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.description
                      ? dataDetailRekamMedis.description
                      : "-"}
                  </h1>
                  <h1>
                    :{" "}
                    {dataDetailRekamMedis.service
                      ? formatServiceNames(dataDetailRekamMedis.service)
                      : "-"}
                  </h1>
                </div>
              </div>

              <div>
                <h1 className="mt-5 text-lg">Keterangan Odontogram</h1>
                <img
                  src={OdontogramGambar}
                  className="p-4 border-2  mt-2"
                  alt=""
                />
                <div className="mt-5">
                  <table>
                    <thead>
                      <tr>
                        <th className="border p-2">No</th>
                        <th className="border p-2">Nomer Gigi</th>
                        <th className="border p-2">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataOdontogram.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border p-2">{idx + 1}</td>
                          <td className="border p-2">{item.nomorGigi}</td>
                          <td className="border p-2">{item.label}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
      /> */}
      <div className="min-h-screen bg-[#F2F2F2]">
        <div className="flex w-full">
          <Sidebar />
          <div className="p-10 w-full ">
            <div className="md:flex lg:flex-row md:gap-[40px] lg:gap-[40px] flex-col gap-[20px] items-start mb-10">
              <div className="flex items-center py-[40px] px-[30px] bg-white w-full border-2 shadow-sm">
                <span className="text-[22px] font-medium">Total Patients</span>
                <span className="text-[50px] font-medium ml-6">
                  {amountHeader.amountPatient}
                </span>
              </div>
              <div className="flex items-center py-[40px] px-[30px] bg-white w-full border-2 shadow-sm">
                <span className="text-[22px] font-medium">
                  Total Medical Records
                </span>
                <span className="text-[50px] font-medium ml-6">
                  {amountHeader.amountMedicalRecord}
                </span>
              </div>
            </div>
            <h1 className="text-2xl text-slate-black font-medium">
              Data Patient Visit
            </h1>
            <div className="mt-[44px] overflow-auto scrollbar-hide bg-white">
              <table className="w-full space-y-[10px]">
                <div className="flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]">
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">
                      No.
                    </h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[100px] max-w-[100px]">
                    <h1 className="text-black text-xs font-semibold">
                      Patient Code
                    </h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">Date</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[220px] max-w-[220px]">
                    <h1 className="text-black text-xs font-semibold">Name</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[220px]">
                    <h1 className="text-black text-xs font-semibold">Gender</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[220px]">
                    <h1 className="text-black text-xs font-semibold">work</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[220px]">
                    <h1 className="text-black text-xs font-semibold">phone</h1>
                  </div>
                  {/* <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">
                      Service
                    </h1>
                  </div> */}
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">
                      Date Of Birth
                    </h1>
                  </div>
                  <div className="flex items-center justify-center gap-[15px] min-w-[220px] max-w-[220px]">
                    <h1 className="text-black text-xs font-semibold">
                      Medical Records
                    </h1>
                  </div>
                </div>
                {Object.values(dataRekamMedis).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t"
                  >
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600]">
                        {idx + 1}
                      </h1>
                    </div>
                    <div className="min-w-[100px] max-w-[100px]">
                      <h1 className="text-[#737373] text-xs font-[600]">
                        {item.number_regristation}
                      </h1>
                    </div>
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {/* {moment(item.date).format("DD MMMM YYYY")} */}
                        {item.date}
                      </h1>
                    </div>
                    <div className="min-w-[220px] max-w-[220px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.fullname}
                      </h1>
                    </div>
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.gender}
                      </h1>
                    </div>
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.work}
                      </h1>
                    </div>
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.phone}
                      </h1>
                    </div>
                    {/* <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.hasil}
                      </h1>
                    </div> */}
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {moment(item.date_birth).format("DD MMMM YYYY")}
                      </h1>
                    </div>
                    <div className="min-w-[220px] max-w-[220px] flex items-center justify-center">
                      <button
                        onClick={() =>
                          navigate("/rekam-medis", {
                            state: {
                              idPasien: item.id_patient,
                              namaPasien: item.fullname,
                            },
                          })
                        }
                        className="w-[150px] text-xs p-2 font-medium bg-slate-600 text-white rounded-[9px]"
                      >
                        see medical record
                      </button>
                    </div>
                  </div>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
