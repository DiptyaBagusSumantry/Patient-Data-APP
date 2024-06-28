import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../../Api";
import toast from "react-hot-toast";
import OdontogramOld from "../../../components/NewOdontogram/odontogram";

export default function CreateRekamMedis() {
  const [dataOdontogram, setDataOdontogram] = useState([]);
  console.log(dataOdontogram, "dataClicked");

  const params = useLocation();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);
  // create state
  const [tanggal, setTanggal] = useState();
  const [diagnosa, setDiagnosa] = useState();
  const [terapi, setTerapi] = useState();
  const [keterangan, setKeterangan] = useState();
  const [dataLayanan, setDataLayanan] = useState([
    {
      id: "1",
      name: "Cough",
      price: 30000,
    },
    {
      id: "2",
      name: "Headache",
      price: 30000,
    },
    {
      id: "3",
      name: "Inject",
      price: 100000,
    },
    {
      id: "4",
      name: "X-ray",
      price: 250000,
    },
    {
      id: "5",
      name: "Fever",
      price: 75000,
    },
  ]);

  const createRekamMedis = async () => {
    try {
      const data = {
        date: tanggal,
        patient_id: params.state.idPasien,
        service: selectedServices,
        diagnosis: diagnosa,
        therapy: terapi,
        description: keterangan,
        odontogram: dataOdontogram,
      };
      console.log(data, 'data')
      const response = await Api.CreateRekamMedis(
        localStorage.getItem("token"),
        data
      );
      toast.success("Success Create Medical Record");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error("Failed Create Medical Record");
    }
  };

  // const getLayanan = async () => {
  //     try {
  //         const response = await Api.GetLayanan(localStorage.getItem('token'))
  //         console.log(response.data.data)
  //         setDataLayanan(response.data.data.map(({ name, price, id }) => ({ name, price, id })))
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  const handleServiceChange = (serviceId, action) => {
    const selectedService = dataLayanan.find(
      (service) => service.id === serviceId
    );
    console.log(selectedService, "selectedService");
    if (action === "add") {
      setSelectedServices([...selectedServices, selectedService]);
    } else if (action === "delete") {
      const updatedServices = selectedServices.filter(
        (service) => service.id !== serviceId
      );
      setSelectedServices(updatedServices);
    }
  };

  // useEffect(() => {
  //     getLayanan()
  // },[])

  return (
    <div>
      <div className="min-h-screen bg-[#F2F2F2]">
        <div className="flex w-full">
          <Sidebar />
          <div className="w-full p-10">
            <div className="space-y-[20px] w-full p-5 bg-white border-2 rounded-lg">
              <h1 className="text-2xl text-slate-black font-medium mb-[20px]">
                Create Medical Record
              </h1>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Date</h1>
                <input
                  onChange={(e) => setTanggal(e.target.value)}
                  type="date"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Insert Date...."
                />
              </div>
              <div className="text-sm w-full gap-3 space-y-4">
                <div className="w-full space-y-2 mb-4">
                  <h1 className="font-medium">Service</h1>
                  <select
                    className="w-full border shadow-md px-2 outline-none py-2 rounded-md"
                    onChange={(e) => handleServiceChange(e.target.value, "add")}
                  >
                    <option disabled selected value="">
                      Select Service...
                    </option>
                    {dataLayanan.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="flex flex-row items-start gap-3">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="px-6 py-2 w-full gap-10 rounded-md space-y-2 bg-slate-200 flex items-center"
                    >
                      <div>
                        <h1>{service.name}</h1>
                        <h2 className="font-medium">
                          Rp. {service.price.toLocaleString()}
                        </h2>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-2 border rounded-md bg-red-700 text-white text-lg"
                          onClick={() =>
                            handleServiceChange(service.id, "delete")
                          }
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
              {/* <div className="text-sm border-2 w-full rounded-md p-3">
                  <h1 className="mb-3 font-medium">Odontogram:</h1>
                  <div>
                    <OdontogramOld
                      tooth={(labelT, zoneT, idT) => {
                        setDataOdontogram((oldArray) => [
                          ...oldArray,
                          {
                            label: labelT,
                            nomorGigi: zoneT,
                            id: idT,
                          },
                        ]);
                      }}
                      rtooth={(id) => {
                        setDataOdontogram((current) =>
                          current.filter((obj) => {
                            return obj.id !== id;
                          })
                        );
                      }}
                    />
                  </div>
                </div> */}

              <div className="text-sm space-y-2">
                <h1 className="font-medium text-lg underline">
                  Maintenance Notes
                </h1>
                <h1 className="font-medium">Diagnosis</h1>
                <input
                  onChange={(e) => setDiagnosa(e.target.value)}
                  type="text"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Diagnosis...."
                />
              </div>

              <div className="text-sm space-y-2">
                <h1 className="font-medium">Therapy</h1>
                <input
                  onChange={(e) => setTerapi(e.target.value)}
                  type="text"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Therapy...."
                />
              </div>
              <div className="text-sm space-y-2">
                <h1 className="font-medium">Description</h1>
                <input
                  onChange={(e) => setKeterangan(e.target.value)}
                  type="text"
                  className="w-full border outline-none shadow-md px-2 py-2 rounded-md"
                  placeholder="Description...."
                />
              </div>

              <div className="space-x-5 pt-7">
                <button
                  onClick={() => navigate(-1)}
                  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={createRekamMedis}
                  className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
