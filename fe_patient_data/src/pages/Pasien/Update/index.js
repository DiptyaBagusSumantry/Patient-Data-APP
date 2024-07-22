import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../../Api";
import toast from "react-hot-toast";

export default function UpdatePasien() {
  const navigate = useNavigate();
  const params = useLocation();
  // create state
  const [tanggal, setTanggal] = useState();
  const [nama, setNama] = useState();
  const [jenisKelamin, setJenisKelamin] = useState();
  const [tempatLahir, setTempatLahir] = useState();
  const [tanggalLahir, setTanggalLahir] = useState();
  const [alamat, setAlamat] = useState();
  const [pekerjaan, setPekerjaan] = useState();
  const [telepon, setTelepon] = useState();
  const [alergi, setAlergi] = useState();
  const [noRM, setNoRM] = useState();

  const getPasienById = async () => {
    try {
      const response = await Api.GetPasienById(
        localStorage.getItem("token"),
        params.state.idPasien
      );
      setNama(response.data.data.fullname);
      setJenisKelamin(response.data.data.gender);
      setTempatLahir(response.data.data.place_birth);
      setTanggalLahir(response.data.data.date_birth);
      setAlamat(response.data.data.address);
      setPekerjaan(response.data.data.work);
      setTelepon(response.data.data.phone);
      setNoRM(response.data.data.number_regristation);
      setAlergi(response.data.data.history_illness);
    } catch (error) {
      console.log(error);
    }
  };
  
  const updatePasien = async () => {
    try {
      const data = {
        number_regristation: noRM,
        fullname: nama,
        place_birth: tempatLahir,
        date_birth: tanggalLahir,
        gender: jenisKelamin,
        address: alamat,
        work: pekerjaan,
        phone: telepon,
        history_illness: alergi,
      };
      console.log(data, "data");
      const response = await Api.UpdatePasien(
        localStorage.getItem("token"),
        data,
        params.state.idPasien
      );
      toast.success("Success Update Patient");
      navigate("/pasien");
    } catch (error) {
      console.log(error);
      toast.error("Failed Update Patient");
    }
  };

  useEffect(() => {
    getPasienById();
  }, []);

  // if (!nama) {
  //     return(
  //         <h1 className='h-screen flex text-2xl font-medium'>Loading...</h1>
  //     )
  // }

  return (
    <div>
      <div className="min-h-screen bg-[#F2F2F2]">
        <div className="flex w-full">
          <Sidebar />
          <div className="w-full p-10">
            <div className="space-y-[20px] w-full p-5 bg-white border-2 rounded-lg">
              <h1 className="text-2xl text-slate-black font-medium mb-[20px]">
                Update Patient
              </h1>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Name</h1>
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  type="text"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Nama Pasien...."
                />
              </div>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Gender</h1>
                <select
                  onChange={(e) => setJenisKelamin(e.target.value)}
                  value={jenisKelamin}
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Laki-Laki">Man</option>
                  <option value="Perempuan">Women</option>
                </select>
              </div>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Place of Birth</h1>
                <div className="flex items-center gap-7">
                  <input
                    value={tempatLahir}
                    onChange={(e) => setTempatLahir(e.target.value)}
                    type="text"
                    className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                    placeholder="Place of Birth...."
                  />
                  <input
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    type="date"
                    className="w-1/3 border outline-none shadow-md px-2 py-2 rounded-md"
                    placeholder="Date of Birth...."
                  />
                </div>
              </div>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Address</h1>
                <input
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  type="text"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Address...."
                />
              </div>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Work</h1>
                <input
                  value={pekerjaan}
                  onChange={(e) => setPekerjaan(e.target.value)}
                  type="text"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Work...."
                />
              </div>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Phone</h1>
                <input
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  type="number"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Phone...."
                />
              </div>

              <div className="space-x-5 pt-7 flex items-center justify-end">
                <button
                  onClick={() => navigate(-1)}
                  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={updatePasien}
                  className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
