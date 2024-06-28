import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";
import Modal from "../../components/Modal";
import Api from "../../Api";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";
import { BiSearch } from "react-icons/bi";
import { debounce } from "lodash";
import moment from "moment";

export default function Pasien() {
  const navigate = useNavigate();
  const [deletePasien, setDeletePasien] = useState(false);
  const [detailPasien, setDetailPasien] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [pasienId, setPasienId] = useState("");
  const [dataPasien, setDataPasien] = useState("");
  const [dataDetailPasien, setDataDetailPasien] = useState("");
  const [refresh, setRefresh] = useState(false);
  const role = "dokter";

  const getPasien = async () => {
    try {
      const response = await Api.GetPasien(
        localStorage.getItem("token"),
        "",
        currentPage
      );
      setDataPasien(response.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(parseInt(response.data.currentPages, 10));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataPasien);
  const handleSearchName = (e) => {
    const searchName = e.target.value;
    debouncedSearchName(searchName);
  };
  const debouncedSearchName = debounce(async (name) => {
    try {
      const response = await Api.GetPasien(
        localStorage.getItem("token"),
        name,
        currentPage
      );
      setDataPasien(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, 300);

  const openDetailPasien = async (id) => {
    setDetailPasien(!detailPasien);
    setPasienId(id);
    try {
      const response = await Api.GetPasienById(
        localStorage.getItem("token"),
        id
      );
      setDataDetailPasien(response.data.data);
      console.log(response, "byId");
    } catch (error) {
      console.log(error);
    }
  };

  const hapusPasien = async () => {
    try {
      const response = await Api.DeletePasien(
        localStorage.getItem("token"),
        pasienId
      );
      toast.success("Sukses Delete Pasien");
      setRefresh(true);
      setDeletePasien(!deletePasien);
    } catch (error) {
      toast.error("Gagal Delete Pasien");
    }
  };

  const actionHapusPasien = async (id) => {
    setPasienId(id);
    setDeletePasien(!deletePasien);
    setRefresh(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setRefresh(true);
  };

  const handlePrevChange = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
    setRefresh(true);
  };

  const handleNextChange = () => {
    if (currentPage === totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(currentPage + 1);
    }
    setRefresh(true);
  };

  useEffect(() => {
    getPasien();
    setRefresh(false);
  }, [refresh]);

  return (
    <div>
      <Modal
        activeModal={detailPasien}
        title={`Detail Patient`}
        buttonClose={() => setDetailPasien(!detailPasien)}
        width={"832px"}
        content={
          <div className=" w-full space-y-[40px]">
            <div className="bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[12px] font-semibold">
              <div className="grid grid-cols-12 mx-auto">
                <div className="col-span-3">
                  <h1>Name</h1>
                  <h1>Gender</h1>
                  <h1>Place and Date of Birth</h1>
                  <h1>Address</h1>
                  <h1>Work</h1>
                  <h1>Phone</h1>
                </div>
                <div className="col-span-9">
                  <h1>
                    : {dataDetailPasien ? dataDetailPasien.fullname : "-"}
                  </h1>
                  <h1>: {dataDetailPasien ? dataDetailPasien.gender : "-"}</h1>
                  <h1>
                    : {dataDetailPasien ? dataDetailPasien.place_birth : "-"},{" "}
                    {dataDetailPasien.date_birth}
                  </h1>
                  <h1>: {dataDetailPasien ? dataDetailPasien.address : "-"}</h1>
                  <h1>: {dataDetailPasien ? dataDetailPasien.work : "-"}</h1>
                  <h1>: {dataDetailPasien ? dataDetailPasien.phone : "-"}</h1>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <ModalDelete
        activeModal={deletePasien}
        buttonClose={() => setDeletePasien(!deletePasien)}
        submitButton={hapusPasien}
      />
      <div className="min-h-screen bg-[#F2F2F2]">
        <div className="flex w-full">
          <Sidebar />
          <div className="w-full p-10">
            <div className="border-2 bg-white rounded-lg p-10 space-y-[20px]">
              <h1 className="text-2xl text-slate-black font-medium mb-[40px]">
                Patient
              </h1>
              <div className="flex items-center justify-between">
                <Link
                  to={"create"}
                  className="px-3 py-2 border rounded-md shadow-sm text-sm bg-blue-700 text-white"
                >
                  New Patient
                </Link>
                <div className="relative">
                  <BiSearch className="absolute left-[14px] top-[10px] text-[#A8A8A8] text-lg" />
                  <input
                    onChange={handleSearchName}
                    placeholder="Search by Name or Phone..."
                    className="h-[38px] text-[#A8A8A8] text-[10px] font-[500] pl-12 border rounded-[12px] py-2 w-full lg:w-[300px]"
                  />
                </div>
              </div>
              <table className="w-full space-y-[10px]">
                <div className="flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]">
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">
                      Patient Code
                    </h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">Name</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">Gender</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">work</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">Phone</h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">
                      Place of Birth
                    </h1>
                  </div>
                  <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                    <h1 className="text-black text-xs font-semibold">
                      Date of Birth
                    </h1>
                  </div>
                  <div className=" w-full flex items-center justify-center">
                    <h1 className="text-black text-xs text-center font-semibold">
                      Action
                    </h1>
                  </div>
                </div>
                {Object.values(dataPasien).map((item, idx) => (
                  <div className="flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t">
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.number_regristation}
                      </h1>
                    </div>
                    <div className="min-w-[150px] max-w-[150px]">
                      {role === "dokter" ? (
                        <button
                          onClick={() =>
                            navigate("/rekam-medis", {
                              state: {
                                idPasien: item.id,
                                namaPasien: item.fullname,
                              },
                            })
                          }
                          className="text-[#0B63F8] text-xs font-[600] line-clamp-1 underline hover:text-blue-700"
                        >
                          {item.fullname}
                        </button>
                      ) : (
                        <h1 className="text-[#0B63F8] text-xs font-[600]">
                          {item.fullname}
                        </h1>
                      )}
                    </div>
                    <div className="min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373] text-xs font-[600] line-clamp-1">
                        {item.gender}
                      </h1>
                    </div>
                    <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373]  text-xs font-semibold line">
                        {item.work}
                      </h1>
                    </div>
                    <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373]  text-xs font-semibold line">
                        {item.phone}
                      </h1>
                    </div>
                    <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373]  text-xs font-semibold line">
                        {item.place_birth}
                      </h1>
                    </div>
                    <div className="flex items-center gap-[15px] min-w-[150px] max-w-[150px]">
                      <h1 className="text-[#737373]  text-xs font-semibold line">
                        {moment(item.date_birth).format("DD MMMM YYYY")}
                      </h1>
                    </div>
                    <div className="w-full space-x-2 flex items-center justify-center">
                      <button
                        onClick={() => openDetailPasien(item.id)}
                        className="flex items-center justify-center w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white"
                      >
                        {" "}
                        Detail
                      </button>
                      <button
                        onClick={() =>
                          navigate("update", { state: { idPasien: item.id } })
                        }
                        className="flex items-center justify-center w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white"
                      >
                        {" "}
                        Update
                      </button>
                      <button
                        onClick={() => actionHapusPasien(item.id)}
                        className="flex items-center justify-center w-[50px] text-xs p-2 font-medium bg-slate-600 rounded-[9px] text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPrevChange={handlePrevChange}
                onNextChange={handleNextChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
