import { IoClose } from "react-icons/io5";
import { TbTrashOff } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import Api from "../../Api";
import toast from "react-hot-toast";

const ModalInputKey = ({ activeModal, buttonClose, submitButton }) => {
  const [keyValue, setKeyValue] = useState(""); // State untuk menyimpan nilai input key

  // Event handler untuk memperbarui state saat nilai input berubah
  const handleInputChange = (e) => {
    setKeyValue(e.target.value);
  };

  // Event handler untuk menangani klik tombol submit
  const handleSubmit = async () => {
     try {
      await submitButton(keyValue); // Memanggil fungsi submitButton dan meneruskan nilai keyValue
      setKeyValue(""); // Mengatur kembali nilai keyValue menjadi string kosong setelah tombol submit ditekan
    } catch (error) {
      console.error(error);
      window.location.reload(); // Memuat ulang halaman jika terjadi kesalahan
    }
  };

  return (
    <div
      className={`${
        activeModal ? "translate-y-0" : "-translate-y-[2000px]"
      } transition-all duration-1000 ease-in-out fixed left-0 top-0 z-50`}
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
        className="h-screen w-screen bg-black backdrop-blur-sm bg-opacity-50 overflow-hidden  p-10"
      >
        <div
          className={`max-h-[700px] overflow-auto shadow-lg bg-white rounded-[12px] px-[41px] py-[37px] scrollbar-hide w-[400px]`}
        >
          <div className="mt-6 flex flex-col justify-center items-center gap-5">
            {/* <TbTrashOff className="text-[120px] text-[#C1121F]" /> */}
            {/* <h1 className="text-center">
              Please Insrt your Key
            </h1> */}
            <div className="text-sm space-y-2">
              <h1 className="font-medium">Insert Your Key</h1>
              <input
                value={keyValue}
                onChange={handleInputChange} // Menggunakan event handler untuk memperbarui state
                type="text"
                className="w-full border outline-none text-center shadow-md px-2 py-2 rounded-md font-medium text-xl"
                placeholder="Please Insert Key ..."
              />
            </div>
            <div className="flex item-center justify-center gap-3 mt-5">
              <button
                onClick={buttonClose}
                className="bg-[#ECECEC] text-[#015995] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]"
              >
                Cancel
              </button>
              <button
                // onClick={submitButton}
                // onClick={() => submitButton(keyValue)}
                onClick={handleSubmit}
                className="bg-[#015995] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInputKey;
