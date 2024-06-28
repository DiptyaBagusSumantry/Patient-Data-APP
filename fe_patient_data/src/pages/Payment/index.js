import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal'
import Api from '../../Api'
import toast from 'react-hot-toast'
import Pagination from '../../components/Pagination'
import { BiSearch } from 'react-icons/bi'
import { debounce } from 'lodash'

export default function Payment() {
    const navigate = useNavigate()
    const [editStatus, setEditStatus] = useState(false)
    const [idPayment, setIdPayment] = useState()
    const [dataPayment, setDataPayment] = useState([])
    const [status, setStatus] = useState()
    const [refresh, setRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setRefresh(true)
    };
    
    const handlePrevChange = () => {
        if(currentPage === 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage - 1);
        }
        setRefresh(true)
    };
    
    const handleNextChange = () => {
        if(currentPage === totalPages) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(currentPage + 1);
        }
        setRefresh(true)
    };

    const getPayment = async () => {
        try {
            const response  = await Api.GetPayment(localStorage.getItem('token'), '', currentPage)
            console.log(response)
            setCurrentPage(parseInt(response.data.currentPages, 10))
            setTotalPages(response.data.totalPages)
            setDataPayment(response.data.data)
        } catch (error) {
            console.log(error)   
        }
    }

    const handleSearchName = (e) => {
        const searchName = e.target.value
        debouncedSearchName(searchName)
    }
    const debouncedSearchName = debounce(async(name) => {
        try {
            const response = await Api.GetPayment(localStorage.getItem('token'), name, currentPage)
            setDataPayment(response.data.data)
            setCurrentPage(response.data.currentPages)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }, 300)

    const openEditPayment = async (id) => {
        setIdPayment(id)
        setEditStatus(!editStatus)
        try {
            const response = await Api.GetPaymentById(localStorage.getItem('token'), id)
            setStatus(response.data.data[0].status)
        } catch (error) {
            console.log(error)
        }
    }

    const updatePayment = async () => {
        try {
            const data = {
                status: status
            }
            const response = await Api.UpdatePayment(localStorage.getItem('token'), data, idPayment)
            setEditStatus(!editStatus)
            setRefresh(true)
            toast.success('Pembayaran Berhasil di Update')
        } catch (error) {
            console.log(error)   
        }
    }

    useEffect(() => {
        getPayment()
        setRefresh(false)
    }, [refresh])

  return (
    <div>
        <Modal 
            activeModal={editStatus}
            title={'Detail Rekam Medis'}
            buttonClose={ () => setEditStatus(!editStatus)}
            width={'832px'}
            content= {
                <div className=' w-full space-y-[40px]'>
                    <div className='bg-[#F8F8F8] rounded-[15px] px-[19px] py-[31px] w-[773px] text-[#737373] text-[14px] font-semibold'>
                        <div className='flex items-center'>
                            <h1 className='w-1/2'>Status Pembayaran</h1>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className='px-4 py-2 border rounded-md  w-full'>
                                <option value="">Pilih Status Pembayaran</option>
                                <option value="0">Belum Lunas</option>
                                <option value="1">Lunas</option>
                            </select>
                        </div>
                    </div>
                    <div className='ml-[560px] flex items-start justify-end gap-3 w-1/4'>
                        <button onClick={() => setEditStatus(!editStatus)}  className="py-2 px-5 border rounded-md border-blue-700  w-[100px] text-blue-700 text-lg">Cancel</button>
                        <button onClick={updatePayment} className="py-2 px-5 border rounded-md bg-blue-700 w-[100px] text-white text-lg">Save</button>
                    </div>

                </div>
            }
        />
        <div className='min-h-screen bg-[#F2F2F2]'>
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-full p-10'>
                    <div className='border-2 bg-white rounded-lg p-10 space-y-[20px]'>
                        <h1 className='text-2xl text-slate-black font-medium mb-[40px]'>Pembayaran</h1>
                        <div className='relative'>
                            <BiSearch className='absolute left-[14px] top-[10px] text-[#A8A8A8] text-lg'/>
                            <input onChange={handleSearchName} placeholder='Search by Name...' className='h-[38px] text-[#A8A8A8] text-[10px] font-[500] pl-12 border rounded-[12px] py-2 w-full lg:w-[300px]'/>
                        </div>
                        <div className='mt-[44px] overflow-auto scrollbar-hide bg-white'>
                        <table className='w-full space-y-[10px]'>
                            <div className='flex items-center gap-3 bg-white px-[14px] py-[10px] rounded-[3px]'>
                                <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-black text-xs font-semibold'>No Transaksi</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[300px] max-w-[300px]'>
                                    <h1 className='text-black text-xs font-semibold'>Nama Pasien</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                    <h1 className='text-black text-xs font-semibold'>Total Pembayaran</h1>
                                </div>
                                <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                    <h1 className='text-black text-xs font-semibold'>Status Pembayaran</h1>
                                </div>
                                <div className=' w-full flex items-center justify-center'>
                                    <h1 className='text-black text-xs text-center font-semibold'>Action</h1>
                                </div>
                            </div>
                            {Object.values(dataPayment).map((item, idx) => (
                                <div className='flex items-center gap-3 bg-white px-[14px] py-[8px] rounded-[3px] border-t'>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#0B63F8] text-xs font-[600]'>{item.invoice ? item.invoice : '-'}</h1>
                                    </div>
                                    <div className='min-w-[300px] max-w-[300px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>{item.fullname ? item.fullname : '-'}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[600] line-clamp-1'>Rp. {item.total_payment ? item.total_payment : '-'}</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className={`${item.status === '0' ? 'text-red-500' : 'text-green-500' } text-xs font-bold line-clamp-1`}>{item.status === '0' ? 'Belum Bayar' : 'Sudah Bayar'}</h1>
                                    </div>
                                    <div className='w-full space-x-2 flex items-center justify-center'>
                                        {item.status === '0' ? (
                                            <>
                                                <button onClick={() => openEditPayment(item.id)} className={` bg-slate-600 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Edit Status </button>
                                                <button disabled onClick={() => navigate('/payment/invoice', {state: {idInvoice: item.id}})} className={` bg-slate-300 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Cetak invoice </button>
                                            </>
                                        ) : (
                                            <>
                                                <button disabled onClick={() => openEditPayment(item.id)} className={` bg-slate-300 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Edit Status </button>
                                                <button onClick={() => navigate('/payment/invoice', {state: {idInvoice: item.id}})} className={` bg-slate-600 w-[100px] text-xs p-2 font-medium text-white rounded-[9px]`}> Cetak invoice </button>
                                            </>
                                        )}
                                        
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
    </div>
  )
}
