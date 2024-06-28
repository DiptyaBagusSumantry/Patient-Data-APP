import React, { useEffect, useState } from "react";
// import html2pdf from 'html2pdf.js';
import { Logo, Lunas } from "../../../assets";
import { useLocation } from "react-router-dom";
import Api from "../../../Api";

export default function Invoice() {
  // const generatePDF = () => {
  //     // Ambil elemen HTML yang ingin Anda ekspor sebagai PDF
  //     // const element = document.getElementById('pdf-content');

  //     // Konfigurasi untuk html2pdf
  //     // const options = {
  //     //   margin: 3,
  //     //   filename: 'invoice.pdf',
  //     //   image: { type: 'jpeg', quality: 0.98 },
  //     //   html2canvas: { scale: 2 },
  //     //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
  //     // };

  //     // Gunakan html2pdf untuk membuat file PDF
  //     // html2pdf(element, options);
  //   };

  const param = useLocation();
  const [dataInvoice, setDataInvoice] = useState("");
  const [dataPurchased, setDataPurchased] = useState("");

  const getInvoice = async () => {
    try {
      const response = await Api.GetPaymentById(
        localStorage.getItem("token"),
        param.state.idInvoice
      );
      setDataInvoice(response.data.data[0]);
      setDataPurchased(response.data.data[0].purchased);
      console.log("data", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);
  return (
    <>
      {/* <div className='flex items-center justify-center mt-10'>
            <button className='mx-auto bg-red-600 text-white font-semibold px-4 py-2' onClick={generatePDF}>Download PDF</button>
        </div> */}
      <div id="pdf-content" className="m-20 p-10 border-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl">Invoice</h1>
            <h1 className="text-4xl font-semibold">
              Sinar Akbar Dental Clinic
            </h1>
          </div>
          <img className="w-50 h-32" src={Logo} alt="" />
        </div>
        <div className="mt-6">
          <h1>Nama: {dataInvoice?.fullname}</h1>
          <h1>Tanggal: {dataInvoice?.createdAt}</h1>
        </div>
        <div>
          <table className="w-full mt-6">
            <thead>
              <tr>
                <th className="border p-2">No.</th>
                <th className="border p-2">Deskripsi</th>
                <th className="border p-2">Harga</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(dataPurchased).map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{idx + 1}.</td>
                  <td className="border p-2">{item?.name}</td>
                  <td className="border p-2">{item?.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <h1 className="text-lg font-medium text-end">
            Total: Rp.{dataInvoice?.total_payment}
          </h1>
          <img className="w-40 h-20 -rotate-12" src={Lunas} alt="" />
        </div>
      </div>
    </>
  );
}
