import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';



export default function UpdateRekamMedis() {
    const navigate = useNavigate()
    const params = useLocation()
    const [selectedServices, setSelectedServices] = useState([]);
    const initialServices = [
        { id: 1, name: 'Cabut Gigi', price: 300000 },
        { id: 2, name: 'Pasang Behel', price: 400000 },
        { id: 3, name: 'Tambal Gigi', price: 500000 },
    ];
    const handleServiceChange = (serviceId, action) => {
        const selectedService = initialServices.find(service => service.id === serviceId);
    
        if (action === 'add') {
        setSelectedServices([...selectedServices, selectedService]);
        } else if (action === 'delete') {
        const updatedServices = selectedServices.filter(service => service.id !== serviceId);
        setSelectedServices(updatedServices);
        }
    };
    console.log(selectedServices, 'selected')
    
    return (
        <div>
            <div className='min-h-screen bg-[#F2F2F2]'>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-full p-10'>
                        <div className='space-y-[20px] w-full p-5 bg-white border-2 rounded-lg'>
                        <h1 className='text-2xl text-slate-black font-medium mb-[20px]'>Edit Rekam Medis</h1>

                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium'>Tanggal</h1>
                                <input type="date" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Nama Pasien....'/>
                            </div>
                            <div className='text-sm w-full gap-3 space-y-4'>
                                <div className='w-full space-y-2 mb-4'>
                                    <h1 className='font-medium'>Layanan</h1>
                                    <select
                                    className='w-full border shadow-md px-2 outline-none py-2 rounded-md'
                                    onChange={(e) => handleServiceChange(parseInt(e.target.value), 'add')}
                                    >
                                    <option value="">Pilih Layanan...</option>
                                    {initialServices.map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                    </select>
                                </div>
                                <div className='flex flex-row items-start gap-3'>
                                    {selectedServices.map(service => (
                                        <div key={service.id} className='px-6 py-2 w-full gap-10 rounded-md space-y-2 bg-slate-200 flex items-center'>
                                            <div>
                                                <h1>{service.name}</h1>
                                                <h2 className='font-medium'>Rp. {service.price.toLocaleString()}</h2>
                                            </div>
                                            <div className='flex items-center justify-center gap-1'>
                                                <button className='p-2 border rounded-md bg-red-700 text-white text-lg' onClick={() => handleServiceChange(service.id, 'delete')} >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='text-sm border-2 w-full rounded-md p-3'>
                                <h1 className='mb-3 font-medium'>Odontogram:</h1>
                                {/* <Odontogram /> */}
                            </div>

                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium text-lg underline'>Catatan Perawatan</h1>
                                <h1 className='font-medium'>Diagnosa</h1>
                                <input type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Diagnosa....'/>
                            </div>

                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium'>Terapi</h1>
                                <input type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Terapi....'/>
                            </div>
                            <div className='text-sm space-y-2'>
                                <h1 className='font-medium'>Keterangan</h1>
                                <input type="text" className='w-full border outline-none shadow-md px-2 py-2 rounded-md' placeholder='Keterangan....'/>
                            </div>

                            <div className='space-x-5 pt-7'>
                                <button onClick={() => navigate(-1, )} className='py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg'>
                                    Cancel
                                </button>
                                <button className='py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg'>
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
